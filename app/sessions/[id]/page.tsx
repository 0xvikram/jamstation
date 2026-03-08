import {
  ArrowLeft, Users, Mic, Video, MessageSquare,
  Radio, DollarSign, Send, Share2,
  Zap, Flame
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mic2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import RequestButton from "./components/RequestButton";
import HostRequestPanel from "./components/HostRequestPanel";

export default async function SessionStage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [session, authSession] = await Promise.all([
    prisma.session.findUnique({
      where: { id },
      include: {
        host: { select: { id: true, name: true, username: true, avatarUrl: true } },
        requests: {
          where: { status: "PENDING" },
          include: {
            user: { select: { id: true, name: true, username: true, avatarUrl: true } },
          },
          orderBy: { createdAt: "asc" },
        },
        _count: { select: { requests: { where: { status: "APPROVED" } } } },
      },
    }),
    auth(),
  ]);

  if (!session) notFound();

  const currentUserId = (authSession?.user as any)?.id as string | undefined;
  const isHost = currentUserId === session.host.id;
  const hostName = session.host.name ?? session.host.username;
  const hostInitial = hostName[0]?.toUpperCase() ?? "H";

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-cyan-500/50 container-fluid overflow-x-hidden">
      {/* Dynamic Background for context */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_#000000_60%)]"></div>

      {/* Stage Navbar */}
      <nav className="h-20 border-b border-white/10 px-6 flex items-center justify-between bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-neutral-400 hover:text-cyan-400 transition-colors p-3 rounded-full hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-8 w-px bg-white/10"></div>
          <div>
            <h1 className="font-black text-2xl tracking-tight text-white flex items-center gap-3 uppercase italic">
              {session.title}
              {session.status === "LIVE" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-black bg-red-600/20 text-red-500 border border-red-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE
                </span>
              )}
              {session.status === "UPCOMING" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-black bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
                  Upcoming
                </span>
              )}
              {session.status === "ENDED" && (
                <span className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-black bg-neutral-500/20 text-neutral-400 border border-neutral-500/30 uppercase tracking-widest">
                  Ended
                </span>
              )}
            </h1>
            <div className="text-xs font-bold text-neutral-400 flex items-center gap-2 mt-1 uppercase tracking-widest">
              HOST: <span className="font-black text-fuchsia-400">{hostName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-sm font-black uppercase tracking-wider text-neutral-300">
            <Users className="w-5 h-5 text-cyan-400" />
            {session._count.requests} on stage
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-lime-500/20 hover:border-lime-500/40 hover:text-lime-400 text-neutral-300 transition-all shadow-[0_0_0_rgba(163,230,53,0)] hover:shadow-[0_0_15px_rgba(163,230,53,0.3)]">
            <Share2 className="w-5 h-5" />
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-sm border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
          >
            Leave
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] w-full mx-auto p-4 gap-4 relative z-10">
        {/* Main Stage */}
        <main className="flex-1 flex flex-col min-h-[400px]">
          <div className="flex-1 rounded-3xl bg-neutral-900/80 border border-cyan-500/20 relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col items-center justify-center backdrop-blur-md">

            {/* Visualizer element approximation */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

            <div className="absolute top-[20%] right-[20%] w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px] z-0"></div>
            <div className="absolute bottom-[20%] left-[20%] w-64 h-64 rounded-full bg-fuchsia-500/10 blur-[80px] z-0"></div>

            <div className="relative z-0 mt-8">
              <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
                <Mic2 className="w-16 h-16 md:w-28 md:h-28 text-white/80" />
              </div>
            </div>

            {/* Host name overlay */}
            <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4 bg-black/40 p-3 pr-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-xl font-black shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                {hostInitial}
              </div>
              <div>
                <div className="font-black text-xl text-white uppercase tracking-tight">{hostName}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Host</div>
              </div>
            </div>

            {/* Stage controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform translate-y-4 lg:group-hover:translate-y-0">
              <button className="p-4 rounded-xl bg-neutral-800 hover:bg-cyan-500/20 text-white hover:text-cyan-400 border border-transparent hover:border-cyan-500/40 transition-all shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Mic className="w-6 h-6" />
              </button>
              <button className="p-4 rounded-xl bg-neutral-800 hover:bg-cyan-500/20 text-white hover:text-cyan-400 border border-transparent hover:border-cyan-500/40 transition-all shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Video className="w-6 h-6" />
              </button>
              {isHost && (
                <button className="p-4 rounded-xl bg-neutral-800 hover:bg-fuchsia-500/20 text-white hover:text-fuchsia-400 border border-transparent hover:border-fuchsia-500/40 transition-all shadow-[0_0_0_rgba(217,70,239,0)] hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                  <Radio className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-md flex flex-col p-5 h-[500px] lg:h-auto shrink-0 z-30 shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          {/* Actions */}
          <div className="mb-6 space-y-4 relative z-10">
            {isHost ? (
              <>
                <div className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Stage Requests ({session.requests.length})
                </div>
                <HostRequestPanel initialRequests={session.requests} />
              </>
            ) : (
              <>
                {session.status === "LIVE" && <RequestButton sessionId={id} />}
                <button className="w-full py-4 px-4 rounded-xl bg-lime-500/10 border-2 border-lime-500/30 hover:bg-lime-500/20 hover:border-lime-400 text-lime-400 font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_0_rgba(163,230,53,0)] hover:shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                  <Flame className="w-5 h-5" /> Tip the Host
                </button>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col min-h-0 relative z-10">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-2 mb-4">
              <button className="text-sm font-black uppercase tracking-wider text-white border-b-2 border-cyan-500 pb-2 -mb-2.5">
                Live Chat
              </button>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="text-xs text-center text-neutral-500 font-bold uppercase tracking-widest py-4">
                Welcome to the session! Keep it respectful.
              </div>
            </div>

            {/* Chat Input */}
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-cyan-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-14 py-4 bg-black/60 border border-white/10 rounded-xl text-sm font-medium focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white placeholder-neutral-600 transition-all"
                placeholder="Drop a message or a 🔥..."
              />
              <button className="absolute inset-y-0 right-2 flex items-center justify-center text-white bg-cyan-500 hover:bg-cyan-400 p-2.5 rounded-lg my-1.5 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
