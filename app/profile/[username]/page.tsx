import { ArrowLeft, CheckCircle2, Clock, MapPin, Music, Play, Radio, Star, Users } from "lucide-react";
import Link from "next/link";

export default function ProfilePage({ params }: { params: { username: string } }) {
    // Decoding just in case it's a dynamic slug, but fallback to a nice name for demo
    const username = params.username === "me" ? "Miles Davis" : decodeURIComponent(params.username);
    const averageRating = 4.8;
    const reviewCount = 124;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-24">
            {/* Nav */}
            <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-12">
                {/* Profile Header Block */}
                <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl mb-12">
                    {/* Glow background */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/20 to-pink-500/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-slate-800 border-4 border-slate-900 shadow-xl overflow-hidden shadow-indigo-500/20">
                            {/* Realistic placeholder avatar */}
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${username}&backgroundColor=c0aede`} alt={username} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{username}</h1>
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Host
                                </span>
                            </div>

                            <p className="text-slate-300 text-lg mb-4 max-w-xl">
                                Jazz aficionado, trumpet player, and music producer based in NY. Let's make some noise!
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1.5 rounded-lg">
                                    <Star className="w-4 h-4 fill-emerald-400" />
                                    {averageRating} <span className="text-emerald-400/70">({reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Users className="w-4 h-4" /> 1.2k Followers
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Music className="w-4 h-4" /> 47 Sessions Hosted
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white text-black font-bold shadow-lg hover:bg-slate-200 transition-colors text-center">
                                Follow
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors text-center">
                                Request Collab
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Tabs area */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Voice Sample demo */}
                        <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Radio className="w-5 h-5 text-indigo-400" /> Voice Sample / Portfolio
                            </h3>
                            <div className="bg-black/40 rounded-xl p-4 flex items-center gap-4 border border-white/5">
                                <button className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20">
                                    <Play className="w-6 h-6 ml-1" />
                                </button>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm mb-1">Miles' Trumpet Solo Demo</div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-indigo-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>0:24</span>
                                        <span>1:45</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <History className="w-5 h-5 text-indigo-400" /> Past Sessions
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-16 h-16 rounded-lg bg-slate-800 shrink-0"></div>
                                        <div>
                                            <h4 className="font-bold mb-1">Live from New York Vol. {i}</h4>
                                            <p className="text-xs text-slate-400 mb-2">Ended 2 days ago • 354 listeners</p>
                                            <div className="flex items-center gap-1 mt-1 text-emerald-400 text-xs font-semibold">
                                                <Star className="w-3 h-3 fill-emerald-400" /> 5.0 rating
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold mb-4">About</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Playing trumpet since 2005. I love collaborating on jazz, funk, and lofi hip-hop. Open to stage requests during my live sessions!
                            </p>

                            <hr className="border-white/5 mb-4" />

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <MapPin className="w-4 h-4 text-slate-500" /> New York, NY
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Clock className="w-4 h-4 text-slate-500" /> Joined January 2026
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function History({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
        </svg>
    );
}
