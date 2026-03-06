import { auth, signIn } from "@/auth";
import { Mic2, Users, Radio, ArrowRight, Play, Headphones, Music, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  // If already logged in, they can go to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 font-sans tracking-tight">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-neutral-950"></div>

      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Mic2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              JamStation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SignInButton />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 opacity-50 blur-[120px] rounded-full point-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
              <Radio className="w-4 h-4 animate-pulse text-indigo-400" />
              <span>The definitive platform for live jam sessions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                Your Digital Stage,
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mt-2">
                Synchonized Perfectly.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience zero-latency live music collaboration. Connect with fellow musicians, perform for a global audience, and monetize your talent—all in real-time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignInButton label="Start Jamming Now" size="lg" />
              <button className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 flex items-center gap-2">
                <Play className="w-5 h-5" />
                See How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="px-6 py-24 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ultra-Low Latency</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Powered by WebRTC, experience real-time audio synchronization under 50ms. Like being in the same room.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/30 transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Audience</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Go live to discovery feeds. Monetize your digital stage with simple entry fees and tipping systems.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/30 transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Vetted Performers</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Voice sample verification ensures high-quality performances. Powerful host controls keep sessions secure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-sm text-neutral-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Music className="w-4 h-4" />
          <span className="font-medium text-neutral-400">JamStation v1.0</span>
        </div>
        <p>&copy; {new Date().getFullYear()} JamStation platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Separate component for the Auth form to keep it clean
function SignInButton({ label = "Sign In", size = "sm" }: { label?: string, size?: "sm" | "lg" }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button
        type="submit"
        className={`bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2
          ${size === "lg" ? "px-8 py-4 text-lg" : "px-4 py-2 text-sm"}
        `}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {label}
        {size === "lg" && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
}
