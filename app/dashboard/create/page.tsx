import { ArrowLeft, Calendar, DollarSign, FileText, Music } from "lucide-react";
import Link from "next/link";

export default function CreateSessionPage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <div className="bg-slate-900 border border-white/5 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold mb-2">Host a Session</h1>
                    <p className="text-slate-400 mb-8">Set up your digital stage and let the world hear your sound.</p>

                    <form className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Session Title</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Music className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium mb-1"
                                    placeholder="e.g. Late Night Jazz Improv"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description <span className="text-slate-500">(Optional)</span></label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 flex items-center pointer-events-none text-slate-500">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <textarea
                                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium min-h-[100px] resize-none pb-1"
                                    placeholder="What are we jamming tonight?"
                                ></textarea>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <input
                                    type="datetime-local"
                                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium [color-scheme:dark]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Entry Fee */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Entry Fee ($)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    defaultValue="0"
                                    className="block w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-white/10 text-emerald-400 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-bold"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Leave at $0 for free sessions to grow your audience faster.</p>
                        </div>

                        <hr className="border-white/5 py-2" />

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link href="/dashboard" className="px-6 py-3 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                                Cancel
                            </Link>
                            <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all">
                                Launch Stage
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
