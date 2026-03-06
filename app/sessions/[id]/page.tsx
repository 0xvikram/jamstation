import {
  ArrowLeft, Users, Mic, Video, MessageSquare,
  Radio, DollarSign, Send, Share2,
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
    <div className="min-h-screen bg-black text-slate-50 font-sans flex flex-col">
      {/* Stage Navbar */}
      <nav className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-black/50 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-white/10"></div>
          <div>
            <h1 className="font-bold tracking-tight text-white flex items-center gap-2">
              {session.title}
              {session.status === "LIVE" && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-500 border border-red-500/20 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Live
                </span>
              )}
              {session.status === "UPCOMING" && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                  Upcoming
                </span>
              )}
              {session.status === "ENDED" && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-slate-500/20 text-slate-400 border border-slate-500/20 uppercase tracking-widest">
                  Ended
                </span>
              )}
            </h1>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              Hosted by <span className="font-medium text-slate-300">{hostName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm font-medium text-slate-300">
            <Users className="w-4 h-4 text-indigo-400" />
            {session._count.requests} on stage
          </div>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg font-medium text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            Leave Session
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1600px] w-full mx-auto">
        {/* Main Stage */}
        <main className="flex-1 flex flex-col p-4">
          <div className="flex-1 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden group shadow-2xl flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10"></div>

            <div className="relative z-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)] animate-pulse">
                <Mic2 className="w-16 h-16 md:w-24 md:h-24 text-white/50" />
              </div>
            </div>

            {/* Host name overlay */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-lg font-bold">
                {hostInitial}
              </div>
              <div>
                <div className="font-bold text-lg text-white drop-shadow-md">{hostName}</div>
                <div className="text-sm font-medium text-indigo-300 drop-shadow-md">Host</div>
              </div>
            </div>

            {/* Stage controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity p-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
              <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                <Video className="w-5 h-5" />
              </button>
              {isHost && (
                <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                  <Radio className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-950 flex flex-col pt-4 pb-4 px-4 h-[400px] lg:h-auto shrink-0 z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">

          {/* Actions */}
          <div className="mb-6 space-y-3">
            {isHost ? (
              <>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Stage Requests ({session.requests.length})
                </div>
                <HostRequestPanel initialRequests={session.requests} />
              </>
            ) : (
              <>
                {session.status === "LIVE" && <RequestButton sessionId={id} />}
                <button className="w-full py-3 px-4 rounded-xl bg-white/5 border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-emerald-400 font-bold text-sm transition-all flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4" /> Tip the Host
                </button>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-2 mb-4">
              <button className="text-sm font-semibold text-white border-b-2 border-indigo-500 pb-2 -mb-2.5">
                Chat
              </button>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className="text-xs text-center text-slate-500 font-medium py-2">
                Welcome to the session!
              </div>
            </div>

            {/* Chat Input */}
            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                <MessageSquare className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="w-full pl-9 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-indigo-500/50 text-white placeholder-slate-500"
                placeholder="Say something..."
              />
              <button className="absolute inset-y-0 right-2 flex items-center justify-center text-indigo-400 hover:text-indigo-300 p-2">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
