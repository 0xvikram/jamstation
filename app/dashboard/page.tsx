import Link from "next/link";
import { Mic2, Users, Calendar, Clock, DollarSign, Play, PlusCircle, Zap, Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";

const CARD_COLORS = [
  "from-cyan-900/60 to-cyan-950/80",
  "from-fuchsia-900/60 to-fuchsia-950/80",
  "from-lime-900/60 to-lime-950/80",
  "from-purple-900/60 to-purple-950/80",
  "from-pink-900/60 to-pink-950/80",
  "from-emerald-900/60 to-emerald-950/80",
];

const CARD_BORDERS = [
  "border-cyan-500/30",
  "border-fuchsia-500/30",
  "border-lime-500/30",
  "border-purple-500/30",
  "border-pink-500/30",
  "border-emerald-500/30",
];

const CARD_GLOWS = [
  "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-400",
  "hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:border-fuchsia-400",
  "hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:border-lime-400",
  "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:border-purple-400",
  "hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:border-pink-400",
  "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:border-emerald-400",
];

function getStyles(id: string) {
  const index = id.charCodeAt(0) % CARD_COLORS.length;
  return {
    bg: CARD_COLORS[index],
    border: CARD_BORDERS[index],
    glow: CARD_GLOWS[index],
  };
}

export default async function DashboardPage() {
  const liveSessions = await prisma.session.findMany({
    where: { status: "LIVE" },
    include: {
      host: { select: { name: true, username: true } },
      _count: { select: { requests: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const upcomingSessions = await prisma.session.findMany({
    where: { status: "UPCOMING" },
    include: {
      host: { select: { name: true, username: true } },
    },
    orderBy: { startTime: "asc" },
    take: 10,
  });

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-neutral-900/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 border border-cyan-500/20">
            <Zap className="w-3 h-3" /> Jam Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 italic">
            <span className="text-white">Discover & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Play</span>
          </h1>
          <p className="text-neutral-400 font-medium text-lg">Find live jams, join the stage, or just vibe out.</p>
        </div>
        <Link
          href="/dashboard/create"
          className="relative group inline-flex items-center justify-center font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <span className="relative flex items-center drop-shadow-md">
            <PlusCircle className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" /> Host Session
          </span>
        </Link>
      </div>

      {/* Live Now Grid */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          </span>
          <h2 className="text-2xl font-black uppercase tracking-wider italic text-white flex items-center gap-2">
            Live Now <Flame className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          </h2>
          {liveSessions.length > 0 && (
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm font-bold ml-2 border border-red-500/30">
              {liveSessions.length} active
            </span>
          )}
        </div>

        {liveSessions.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 border-2 border-dashed border-white/10 rounded-3xl backdrop-blur-sm">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Mic2 className="w-10 h-10 text-neutral-600" />
            </div>
            <p className="text-neutral-400 font-bold text-xl uppercase tracking-wider mb-2">The stage is empty</p>
            <p className="text-neutral-500 text-lg">Be the first to drop some beats — host a session above.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveSessions.map((s) => {
              const styles = getStyles(s.id);
              return (
                <Link href={`/sessions/${s.id}`} key={s.id} className="group block h-full">
                  <div className={`flex flex-col h-full bg-neutral-900/80 border ${styles.border} rounded-3xl overflow-hidden transition-all duration-300 ${styles.glow} relative`}>
                    <div className={`h-48 bg-gradient-to-br ${styles.bg} relative p-6 flex flex-col justify-end`}>
                      {/* Grid overlay for texture */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

                      <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-[0_0_10px_rgba(220,38,38,0.6)] backdrop-blur-md border border-red-400/30">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> LIVE
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        {s._count.requests} tuned in
                      </div>

                      <Mic2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/10" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between relative z-10 bg-neutral-900">
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all">
                          {s.title}
                        </h3>
                        {s.description && (
                          <p className="text-sm text-neutral-400 mb-4 line-clamp-2 font-medium">{s.description}</p>
                        )}
                        <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                          HOST: <span className="text-cyan-400">{s.host.name ?? s.host.username}</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        {s.entryFee > 0 ? (
                          <div className="flex items-center gap-1.5 text-sm font-black text-fuchsia-400 bg-fuchsia-400/10 px-3 py-1.5 rounded-lg border border-fuchsia-500/20">
                            <DollarSign className="w-4 h-4" />{s.entryFee}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-sm font-black text-lime-400 bg-lime-400/10 px-3 py-1.5 rounded-lg border border-lime-500/20 uppercase tracking-wider">
                            Free Entry
                          </div>
                        )}

                        <div className="text-sm font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors flex items-center gap-2 bg-white/5 group-hover:bg-cyan-500/20 px-4 py-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                          JOIN <Play className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming Sessions */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-6 h-6 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
          <h2 className="text-2xl font-black uppercase tracking-wider italic text-white flex items-center gap-2">
            The Lineup
          </h2>
        </div>

        {upcomingSessions.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900/30 border border-white/5 rounded-3xl">
            <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Nothing on the radar yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((s) => (
              <Link
                key={s.id}
                href={`/sessions/${s.id}`}
                className="group block bg-neutral-900 border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-neutral-800 hover:border-fuchsia-500/30 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400 border border-white/10 group-hover:border-fuchsia-500/30 group-hover:bg-fuchsia-500/10 transition-colors">
                    <Mic2 className="w-8 h-8 group-hover:text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tight text-white group-hover:text-fuchsia-300 transition-colors mb-1">{s.title}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                      HOST: <span className="text-neutral-300 group-hover:text-white">{s.host.name ?? s.host.username}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-300 bg-black/50 px-4 py-2.5 rounded-xl border border-white/10 group-hover:border-cyan-500/30">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    {new Date(s.startTime).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-black uppercase tracking-wider px-4 py-2.5 rounded-xl border border-lime-500/30 text-lime-400 bg-lime-500/10">
                    {s.entryFee > 0 ? (
                      <><DollarSign className="w-4 h-4" />{s.entryFee}</>
                    ) : (
                      "Free"
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
