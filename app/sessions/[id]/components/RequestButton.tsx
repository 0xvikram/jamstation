"use client";

import { useState } from "react";
import { Hand, Loader2, CheckCircle } from "lucide-react";

export default function RequestButton({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleRequest() {
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch(`/api/sessions/${sessionId}/request`, {
        method: "POST",
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Failed to send request");
      }

      setStatus("sent");
      setMessage("Your request is pending host approval.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent") {
    return (
      <div className="w-full py-3 px-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-sm flex items-center justify-center gap-2">
        <CheckCircle className="w-4 h-4" /> Request Sent
        {message && <span className="text-xs font-normal text-indigo-400 ml-1">— {message}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <button
        onClick={handleRequest}
        disabled={status === "loading"}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Hand className="w-4 h-4" />
        )}
        {status === "loading" ? "Sending…" : "Request to Join Stage"}
      </button>

      {status === "error" && message && (
        <p className="text-xs text-red-400 text-center">{message}</p>
      )}
    </div>
  );
}
