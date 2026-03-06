import { ReactNode } from "react";
import { Mic2, LogOut, LayoutDashboard, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
            {/* Top Navigation */}
            <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Mic2 className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                JamStation
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Discovery
                            </Link>
                            <Link href="/dashboard/create" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                <PlusCircle className="w-4 h-4" /> Host Session
                            </Link>
                            {/* In a real app we'd link to the user's slug/username. Let's link to a mock one or default /profile */}
                            <Link href="/profile/me" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                <User className="w-4 h-4" /> Profile
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 hidden sm:inline-block">
                            {session?.user?.name || session?.user?.email}
                        </span>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button type="submit" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-colors">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
