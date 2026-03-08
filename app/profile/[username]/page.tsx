import { ArrowLeft, CheckCircle2, Clock, MapPin, Music, Play, Radio, Star, Users, Flame, Zap, Mic } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;
    const usernameSlug = decodeURIComponent(resolvedParams.username);

    let user = null;

    if (usernameSlug === "me") {
        const session = await auth();
        if (session?.user?.id) {
            user = await prisma.user.findUnique({
                where: { id: session.user.id }
            });
        }
    } else {
        user = await prisma.user.findUnique({
            where: { username: usernameSlug }
        });
    }

    if (!user) {
        return notFound();
    }

    const averageRating = 4.8; // Mock for now until rating system is built
    const reviewCount = 124;

    const displayUsername = user.username;
    const avatarUrl = user.avatarUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${displayUsername}&backgroundColor=c0aede`;
    const bioText = user.musicalJourney || user.bio || "Just joined JamStation. Let's make some noise!";
    const cityText = user.city || "Earth";
    const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });

    return (
        <div className="min-h-screen bg-black text-white font-sans pb-24 selection:bg-fuchsia-500/50 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_#000000_60%)]"></div>

            {/* Nav */}
            <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center">
                    <Link href="/dashboard" className="text-neutral-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0)] hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                        <ArrowLeft className="w-5 h-5" /> Back to Base
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
                {/* Profile Header Block */}
                <div className="bg-neutral-900/80 border border-fuchsia-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_30px_rgba(217,70,239,0.15)] backdrop-blur-md mb-12 group">
                    {/* Glow background */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/20 to-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20 group-hover:blur-[80px] transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full bg-black border-4 border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.4)] overflow-hidden">
                            <img src={avatarUrl} alt={displayUsername} className={`w-full h-full object-cover transition-all duration-500 ${user.avatarUrl ? '' : 'grayscale brightness-110 contrast-125 hover:grayscale-0'}`} />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                                    {displayUsername}
                                </h1>
                                {user.onboardingCompleted && (
                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                        <CheckCircle2 className="w-4 h-4" /> Verified Host
                                    </span>
                                )}
                            </div>

                            <p className="text-neutral-300 text-lg md:text-xl font-medium mb-6 max-w-xl">
                                {bioText}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 text-lime-400 bg-lime-400/10 border border-lime-500/20 px-4 py-2 rounded-xl shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                                    <Star className="w-4 h-4 fill-lime-400" />
                                    {averageRating} <span className="text-lime-400/70 lowercase font-medium tracking-normal">({reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/20 px-4 py-2 rounded-xl shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                                    <Users className="w-4 h-4" /> 1.2k Followers
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex md:flex-col gap-4 w-full md:w-auto mt-6 md:mt-0 lg:ml-auto">
                            <button className="flex-1 md:flex-none px-8 py-4 rounded-xl font-black uppercase tracking-widest bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:scale-105 transition-all text-center flex justify-center items-center gap-2">
                                <Zap className="w-4 h-4" /> Follow
                            </button>
                            <button className="flex-1 md:flex-none px-8 py-4 rounded-xl border border-white/20 hover:border-cyan-400 font-black uppercase tracking-widest text-white hover:text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all text-center flex justify-center items-center gap-2">
                                <Flame className="w-4 h-4" /> Collab
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Tabs area */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Voice Sample demo */}
                        {user.voiceSampleUrl ? (
                            <section className="bg-neutral-900/50 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-400/50 transition-colors">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full"></div>
                                <h3 className="text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-3 text-white">
                                    <Radio className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> Voice Sample / Portfolio
                                </h3>

                                <a href={user.voiceSampleUrl} target="_blank" rel="noopener noreferrer" className="bg-black/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-white/10 relative z-10 group-hover:border-cyan-500/30 transition-colors hover:bg-black/80">
                                    <button className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                        <Play className="w-8 h-8 ml-1" />
                                    </button>
                                    <div className="flex-1 w-full flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-base uppercase tracking-wider text-white">Listen to {displayUsername}'s Demo</div>
                                            <div className="text-sm font-bold text-cyan-400 mt-1 uppercase tracking-widest">Click to open link →</div>
                                        </div>
                                    </div>
                                </a>
                            </section>
                        ) : (
                            <section className="bg-neutral-900/50 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group hover:border-cyan-400/50 transition-colors opacity-50">
                                <h3 className="text-xl font-black uppercase tracking-wider mb-2 flex items-center gap-3 text-white">
                                    <Radio className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> No Voice Sample
                                </h3>
                                <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">{displayUsername} hasn't uploaded a demo yet.</p>
                            </section>
                        )}

                        <section className="bg-neutral-900/50 border border-fuchsia-500/20 rounded-3xl p-8 backdrop-blur-sm hover:border-fuchsia-400/50 transition-colors">
                            <h3 className="text-xl font-black uppercase tracking-wider mb-6 flex items-center gap-3 text-white">
                                <History className="w-6 h-6 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" /> Past Sessions
                            </h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-5 p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-fuchsia-500/30 hover:bg-black/60 transition-all group">
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-fuchsia-900/80 to-purple-900/80 shrink-0 border border-fuchsia-500/20 flex items-center justify-center relative overflow-hidden">
                                            <Mic className="w-8 h-8 text-fuchsia-500/50 absolute" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="font-black text-lg uppercase tracking-tight text-white group-hover:text-fuchsia-300 transition-colors mb-1">Live from New York Vol. {i}</h4>
                                            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Ended 2 days ago • 354 tuned in</p>
                                            <div className="flex items-center gap-1.5 text-lime-400 text-xs font-black uppercase tracking-widest bg-lime-400/10 w-fit px-2 py-1 rounded">
                                                <Star className="w-3.5 h-3.5 fill-lime-400" /> 5.0 Rating
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm border-t-lime-500/30">
                            <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-white">About</h3>
                            <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-8">
                                {bioText}
                            </p>

                            <hr className="border-white/10 mb-6" />

                            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
                                <li className="flex items-center gap-4 text-neutral-300 border border-white/5 bg-black/30 p-3 rounded-xl hover:bg-black/50 transition-colors">
                                    <MapPin className="w-5 h-5 text-lime-400" /> {cityText}
                                </li>
                                <li className="flex items-center gap-4 text-neutral-300 border border-white/5 bg-black/30 p-3 rounded-xl hover:bg-black/50 transition-colors">
                                    <Clock className="w-5 h-5 text-cyan-400" /> Joined {joinedDate}
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
