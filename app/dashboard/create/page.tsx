"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, DollarSign, FileText, Loader2, Music, Zap } from "lucide-react";
import Link from "next/link";

export default function CreateSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value || null,
      startTime: (form.elements.namedItem("startTime") as HTMLInputElement).value,
      entryFee: Number((form.elements.namedItem("entryFee") as HTMLInputElement).value ?? 0),
    };

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Failed to create session");
      }

      const session = await res.json();
      router.push(`/sessions/${session.id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-cyan-400 mb-8 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Base
      </Link>

      <div className="bg-neutral-900/80 border border-fuchsia-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(217,70,239,0.15)] backdrop-blur-md">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2 italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            Host a Session
          </h1>
          <p className="text-neutral-400 font-medium mb-10 text-lg">Set up your digital stage and let the world hear your sound.</p>

          {error && (
            <div className="mb-8 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase tracking-wide text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                Session Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400">
                  <Music className="w-5 h-5 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </div>
                <input
                  name="title"
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all font-bold text-lg"
                  placeholder="e.g. Late Night Jazz Improv"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-white mb-3">
                Description <span className="text-neutral-600 font-medium text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 flex items-center pointer-events-none text-fuchsia-400">
                  <FileText className="w-5 h-5 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
                </div>
                <textarea
                  name="description"
                  className="block w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 focus:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all font-medium text-lg min-h-[120px] resize-none"
                  placeholder="What are we jamming tonight?"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-white mb-3">Start Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-lime-400">
                  <Calendar className="w-5 h-5 drop-shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                </div>
                <input
                  name="startTime"
                  type="datetime-local"
                  className="block w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 focus:shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all font-bold text-lg [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            {/* Entry Fee */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-white mb-3">Entry Fee ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400">
                  <DollarSign className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </div>
                <input
                  name="entryFee"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  className="block w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-emerald-500/30 text-emerald-400 placeholder-neutral-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all font-black text-2xl"
                />
              </div>
              <p className="text-sm text-neutral-500 mt-3 font-medium">Leave at $0 for free sessions to grow your audience faster.</p>
            </div>

            <hr className="border-white/10 py-2" />

            {/* Submit */}
            <div className="flex justify-between sm:justify-end gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 hover:scale-105"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "LAUNCHING…" : "LAUNCH STAGE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
