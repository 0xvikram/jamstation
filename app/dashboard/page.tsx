import Link from "next/link";
import { Mic2, Users, Calendar, Clock, DollarSign, Play, PlusCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

const CARD_COLORS = [
  "bg-indigo-900/40",
  "bg-violet-900/40",
  "bg-cyan-900/40",
  "bg-rose-900/40",
  "bg-emerald-900/40",
  "bg-amber-900/40",
];

function cardColor(id: string) {
  const index =
    id.charCodeAt(0) % CARD_COLORS.length;
  return CARD_COLORS[index];
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
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Discovery</h1>
          <p className="text-slate-400">Find live jam sessions, join the stage, or just listen in.</p>
        </div>
        <Link
          href="/dashboard/create"
          className="inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Create Session
        </Link>
      </div>

      {/* Live Now Grid */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <h2 className="text-xl font-bold">Live Now</h2>
          {liveSessions.length > 0 && (
            <span className="text-sm text-slate-400">({liveSessions.length})</span>
          )}
        </div>

        {liveSessions.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 border border-white/5 rounded-2xl">
            <Mic2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No live sessions right now.</p>
            <p className="text-sm text-slate-500 mt-1">Be the first — create a session above.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveSessions.map((s) => (
              <Link href={`/sessions/${s.id}`} key={s.id} className="group block h-full">
                <div className="flex flex-col h-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-xl shadow-black/20 relative">
                  <div className={`h-40 ${cardColor(s.id)} relative`}>
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                      LIVE
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-300" />
                      {s._count.requests} joined
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {s.title}
                      </h3>
                      {s.description && (
                        <p className="text-sm text-slate-500 mb-2 line-clamp-2">{s.description}</p>
                      )}
                      <p className="text-sm text-slate-400 mb-4">
                        Hosted by{" "}
                        <span className="text-slate-200">{s.host.name ?? s.host.username}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                        {s.entryFee > 0 ? (
                          <><DollarSign className="w-3 h-3" />{s.entryFee}</>
                        ) : (
                          "Free Access"
                        )}
                      </div>
                      <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
                        Join <Play className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Sessions */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold">Upcoming Sessions</h2>
        </div>

        {upcomingSessions.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-white/5 rounded-2xl">
            <p className="text-slate-500 text-sm">No scheduled sessions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((s) => (
              <Link
                key={s.id}
                href={`/sessions/${s.id}`}
                className="block bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Mic2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <p className="text-sm text-slate-400">
                      Hosted by{" "}
                      <span className="text-slate-300">{s.host.name ?? s.host.username}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <Clock className="w-4 h-4 text-violet-400" />
                    {new Date(s.startTime).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 bg-emerald-500/10">
                    {s.entryFee > 0 ? (
                      <><DollarSign className="w-3 h-3" />{s.entryFee}</>
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
