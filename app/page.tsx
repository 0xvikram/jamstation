import { auth, signIn } from "@/auth";
import { Mic2, Users, Radio, ArrowRight, Play, Headphones, Music, ShieldCheck, Flame, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function LandingPage() {
  const session = await auth();

  // If already logged in, they can go to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/50 selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_#000000_60%)]"></div>

      {/* Abstract Glowing Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[150px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-lime-400/10 blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/jamstation-logo.png"
              alt="JamStation Logo"
              width={50}
              height={50}
              className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
            <span className="font-black text-2xl tracking-tighter uppercase italic bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(217,70,239,0.5)]">
              JamStation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SignInButton label="Log In" size="sm" isSecondary />
            <SignInButton label="Sign Up" size="sm" />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-32 md:pt-40 md:pb-40 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">

            {/* Vibe Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-fuchsia-500/30 text-sm font-bold text-fuchsia-400 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <Zap className="w-4 h-4 text-lime-400 animate-pulse" />
              <span className="tracking-wide uppercase">The global stage is yours</span>
            </div>

            <h1 className="text-6xl md:text-8xl md:leading-[1.1] font-black uppercase tracking-tighter mb-8">
              <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Sync Your Sound.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-lime-400 mt-2 filter drop-shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:scale-[1.02] transition-transform duration-300">
                Rule The Stage.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Zero-latency global jamming. Connect, perform, and blow minds in real-time. Drop the aux, pick up the mic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <SignInButton label="SIGN UP TO JAM" size="lg" />
              <SignInButton label="LOG IN" size="lg" isSecondary />
            </div>

            {/* Stats / Social Proof */}
            <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-cyan-600">50ms</span>
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-2">Max Latency</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-pink-600">10k+</span>
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-2">Live Jams</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-lime-300 to-green-600">24/7</span>
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-2">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-2">To Start</span>
              </div>
            </div>

          </div>
        </section>

        {/* Features / Neon Cards */}
        <section className="px-6 py-32 bg-black relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent"></div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight italic">
                <span className="text-white">Why Play </span>
                <span className="text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]">Solo?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-950/20 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8 border border-cyan-500/30 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                  <Headphones className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-white">Hyper-Sync Audio</h3>
                <p className="text-neutral-400 font-medium leading-relaxed">
                  WebRTC powered magic. Under 50ms latency means you stay in the pocket, no matter where your drummer lives.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-fuchsia-500/20 hover:border-fuchsia-400 hover:bg-fuchsia-950/20 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_0_rgba(217,70,239,0)] hover:shadow-[0_10px_30px_rgba(217,70,239,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-8 border border-fuchsia-500/30 group-hover:scale-110 group-hover:bg-fuchsia-500/20 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all">
                  <Flame className="w-8 h-8 text-fuchsia-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-white">Monetize The Hype</h3>
                <p className="text-neutral-400 font-medium leading-relaxed">
                  Go live. Drop virtual tickets. Get tipped in real-time. Turn your bedroom jams into paid gigs instantly.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-lime-500/20 hover:border-lime-400 hover:bg-lime-950/20 hover:-translate-y-2 transition-all duration-300 group shadow-[0_0_0_rgba(163,230,53,0)] hover:shadow-[0_10px_30px_rgba(163,230,53,0.2)]">
                <div className="w-16 h-16 rounded-2xl bg-lime-500/10 flex items-center justify-center mb-8 border border-lime-500/30 group-hover:scale-110 group-hover:bg-lime-500/20 group-hover:shadow-[0_0_15px_rgba(163,230,53,0.5)] transition-all">
                  <ShieldCheck className="w-8 h-8 text-lime-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-wide mb-4 text-white">Troll-Free Zones</h3>
                <p className="text-neutral-400 font-medium leading-relaxed">
                  AI-backed audio scanning and hard-kick moderation tools. Keep the vibes immaculate and the music loud.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="py-24 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-purple-700 to-cyan-600 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>

          <div className="relative z-10 text-center px-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              Ready to break the internet?
            </h2>
            <div className="flex justify-center flex-col sm:flex-row gap-4 items-center">
              <SignInButton label="CREATE ACCOUNT" size="lg" />
              <SignInButton label="LOG IN" size="lg" isSecondary />
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8 opacity-80 mix-blend-screen">
            <Image
              src="/jamstation-logo.png"
              alt="JamStation Logo"
              width={60}
              height={60}
              className="grayscale brightness-200"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold text-neutral-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-cyan-400 transition-colors">Manifesto</Link>
            <Link href="#" className="hover:text-fuchsia-400 transition-colors">Tech Specs</Link>
            <Link href="#" className="hover:text-lime-400 transition-colors">Community</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
          </div>
          <p className="text-neutral-600 font-medium text-sm">
            &copy; {new Date().getFullYear()} JAMSTATION. Vibe check passed.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Separate component for the Auth form to keep it clean
function SignInButton({ label = "Sign In", size = "sm", isSecondary = false }: { label?: string, size?: "sm" | "lg", isSecondary?: boolean }) {
  // Base classes for different sizes
  const sizeClasses = size === "lg"
    ? "px-8 py-4 text-lg"
    : "px-6 py-2.5 text-sm";

  // Visual style variants
  const primaryStyle = size === "lg"
    ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1"
    : "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 text-fuchsia-300 border border-fuchsia-500/30 hover:border-fuchsia-400 hover:shadow-[0_0_10px_rgba(217,70,239,0.3)]";

  const secondaryStyle = size === "lg"
    ? "border-2 border-white/20 hover:border-white/50 bg-black/50 hover:bg-white/5 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-1"
    : "bg-transparent hover:bg-white/10 text-neutral-300 border border-white/10 hover:border-white/30";

  const styleClasses = isSecondary ? secondaryStyle : primaryStyle;

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
      className="w-full sm:w-auto"
    >
      <button
        type="submit"
        className={`w-full group font-black uppercase tracking-wider rounded-full flex items-center justify-center gap-3 transition-all duration-300 ${sizeClasses} ${styleClasses}`}
      >
        <svg className="w-5 h-5 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 24 24">
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
        {!isSecondary && size === "lg" && <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0 text-lime-400" />}
      </button>
    </form>
  );
}
