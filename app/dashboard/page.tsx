import Link from "next/link";
import { Mic2, Users, Calendar, Clock, DollarSign, Play, PlusCircle } from "lucide-react";

export default function DashboardPage() {
    // Mock Data for Discovery Feed
    const liveSessions = [
        { id: "1", title: "Midnight Jazz Jam", host: "Miles D.", genre: "Jazz", viewers: 142, entryFee: 0, image: "bg-indigo-900/40" },
        { id: "2", title: "Acoustic Pop Covers", host: "Sarah K.", genre: "Pop", viewers: 89, entryFee: 5, image: "bg-violet-900/40" },
    ];

    const upcomingSessions = [
        { id: "3", title: "Indie Rock Collab", host: "The Locals", time: "Tonight, 8:00 PM", entryFee: 2 },
        { id: "4", title: "Lofi Beats Session", host: "ChillWav", time: "Tomorrow, 2:00 PM", entryFee: 0 },
        { id: "5", title: "Blues Guitar Solo Demo", host: "John Mayer", time: "Fri, 7:00 PM", entryFee: 15 },
    ];

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
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveSessions.map(session => (
                        <Link href={`/sessions/${session.id}`} key={session.id} className="group block h-full">
                            <div className="flex flex-col h-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-xl shadow-black/20 relative">
                                {/* Thumbnail/Cover Placeholder */}
                                <div className={`h-40 ${session.image} relative`}>
                                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
                                        LIVE
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                                        <Users className="w-3 h-3 text-slate-300" /> {session.viewers}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-semibold text-indigo-400 mb-1 tracking-wider uppercase">{session.genre}</div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{session.title}</h3>
                                        <p className="text-sm text-slate-400 mb-4">Hosted by <span className="text-slate-200">{session.host}</span></p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                                            {session.entryFee > 0 ? (
                                                <><DollarSign className="w-3 h-3" />{session.entryFee}</>
                                            ) : "Free Access"}
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
            </section>

            {/* Upcoming / Recommended */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-xl font-bold">Upcoming Sessions</h2>
                </div>

                <div className="space-y-4">
                    {upcomingSessions.map(session => (
                        <div key={session.id} className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                                    <Mic2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{session.title}</h3>
                                    <p className="text-sm text-slate-400">Hosted by <span className="text-slate-300">{session.host}</span></p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                    <Clock className="w-4 h-4 text-violet-400" />
                                    {session.time}
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 bg-emerald-500/10">
                                    {session.entryFee > 0 ? <><DollarSign className="w-3 h-3" />{session.entryFee}</> : "Free"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
