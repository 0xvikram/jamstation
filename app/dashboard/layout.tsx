import { ReactNode } from "react";
import { Mic2, LogOut, LayoutDashboard, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/");
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { onboardingCompleted: true }
    });

    if (!dbUser?.onboardingCompleted) {
        redirect("/onboarding");
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-fuchsia-500/50 selection:text-white overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_#000000_60%)]"></div>

            {/* Abstract Glowing Orbs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
                <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-lime-400/5 blur-[100px]"></div>
            </div>

            {/* Top Navigation */}
            <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <Image
                                src="/jamstation-logo.png"
                                alt="JamStation Logo"
                                width={40}
                                height={40}
                                className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                            />
                            <span className="font-black text-xl tracking-tighter uppercase italic bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(217,70,239,0.5)]">
                                JamStation
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider ml-8">
                            <Link href="/dashboard" className="text-neutral-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Discovery
                            </Link>
                            <Link href="/dashboard/create" className="text-neutral-400 hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] transition-all flex items-center gap-2">
                                <PlusCircle className="w-4 h-4" /> Host Session
                            </Link>
                            {/* In a real app we'd link to the user's slug/username. Let's link to a mock one or default /profile */}
                            <Link href="/profile/me" className="text-neutral-400 hover:text-lime-400 hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.8)] transition-all flex items-center gap-2">
                                <User className="w-4 h-4" /> Profile
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-neutral-400 hidden sm:inline-block uppercase tracking-wider">
                            {session?.user?.name || session?.user?.email}
                        </span>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button type="submit" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:bg-fuchsia-500/20 hover:text-fuchsia-400 hover:border-fuchsia-500/40 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {children}
            </main>
        </div>
    );
}
