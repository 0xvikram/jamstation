import { auth, signOut } from "@/auth";
import { Mic2, LogOut } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans">
            <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mic2 className="w-5 h-5 text-indigo-400" />
                        <span className="font-bold text-xl tracking-tight">JamStation</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400">{session?.user?.email}</span>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button type="submit" className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-8 mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard.</h1>
                    <p className="text-neutral-400">
                        You are successfully authenticated. Ready to start your next jam session?
                    </p>
                </div>
            </main>
        </div>
    );
}
