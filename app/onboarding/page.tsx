"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    User,
    MapPin,
    Music,
    Headphones,
    Instagram,
    Youtube,
    PlayCircle,
    Mic,
    AtSign,
    ChevronRight,
    ChevronLeft
} from "lucide-react"

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        gender: "",
        musicalJourney: "",
        favoriteSinger: "",
        city: "",
        instagram: "",
        youtube: "",
        spotify: "",
        voiceSampleUrl: "",
        username: ""
    })

    // Basic validation per step
    const handleNext = () => {
        if (step === 1 && (!formData.username /* wait, username is in step 3 */)) {
            // if we wanted strict validation here we could add it
        }
        setStep((prev) => prev + 1)
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (!formData.username) {
            setError("Username is required!")
            return
        }

        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/user/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to update profile")
            }

            router.push("/dashboard")
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Background neon effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black -z-10" />

            <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
                <h1 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Complete your profile
                </h1>
                <p className="text-zinc-400 mb-8">Step {step} of 3</p>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Step 1: Basic Details */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <User size={16} className="text-purple-400" />
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <MapPin size={16} className="text-blue-400" />
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g. New York, London, Tokyo"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <Music size={16} className="text-pink-400" />
                                Musical Journey
                            </label>
                            <textarea
                                name="musicalJourney"
                                value={formData.musicalJourney}
                                onChange={handleChange}
                                placeholder="Tell us about your musical journey..."
                                rows={3}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <Headphones size={16} className="text-emerald-400" />
                                Favorite Singer / Band
                            </label>
                            <input
                                type="text"
                                name="favoriteSinger"
                                value={formData.favoriteSinger}
                                onChange={handleChange}
                                placeholder="Who inspires you?"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Social Links */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <Instagram size={16} className="text-pink-500" />
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <Youtube size={16} className="text-red-500" />
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                name="youtube"
                                value={formData.youtube}
                                onChange={handleChange}
                                placeholder="https://youtube.com/..."
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <PlayCircle size={16} className="text-green-500" />
                                Spotify URL
                            </label>
                            <input
                                type="url"
                                name="spotify"
                                value={formData.spotify}
                                onChange={handleChange}
                                placeholder="https://open.spotify.com/..."
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Voice Sample & Username */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <AtSign size={16} className="text-indigo-400" />
                                Choose a Username <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="unique_username"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-zinc-500 mt-2">This will be your unique identity on JamStation.</p>
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-zinc-300 mb-2">
                                <Mic size={16} className="text-cyan-400" />
                                Voice Sample URL (Optional)
                            </label>
                            <input
                                type="url"
                                name="voiceSampleUrl"
                                value={formData.voiceSampleUrl}
                                onChange={handleChange}
                                placeholder="https://soundcloud.com/... or Google Drive link"
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-xs text-zinc-500 mt-2">
                                You can upload a link to your voice sample. This is optional but highly recommended to be a host of jams!
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-2.5 rounded-full font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {loading ? "Saving..." : "Let's Jam!"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
