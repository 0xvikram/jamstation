"use client";

import { useState } from "react";
import { Check, X, Loader2, Users } from "lucide-react";

type PendingRequest = {
  id: string;
  user: {
    id: string;
    name: string | null;
    username: string;
    avatarUrl: string | null;
  };
};

export default function HostRequestPanel({
  initialRequests,
}: {
  initialRequests: PendingRequest[];
}) {
  const [requests, setRequests] = useState<PendingRequest[]>(initialRequests);
  const [processing, setProcessing] = useState<string | null>(null);

  async function updateRequest(requestId: string, status: "APPROVED" | "REJECTED") {
    setProcessing(requestId);
    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
      }
    } finally {
      setProcessing(null);
    }
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-sm">
        <Users className="w-6 h-6 mx-auto mb-2 opacity-40" />
        No pending requests
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {requests.map((req) => {
        const isProcessing = processing === req.id;
        const displayName = req.user.name ?? req.user.username;
        const initial = displayName[0]?.toUpperCase() ?? "?";

        return (
          <div
            key={req.id}
            className="flex items-center justify-between gap-3 bg-white/5 rounded-xl px-3 py-2.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300 shrink-0">
                {initial}
              </div>
              <span className="text-sm font-medium text-white truncate">
                {displayName}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => updateRequest(req.id, "APPROVED")}
                disabled={isProcessing}
                title="Approve"
                className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => updateRequest(req.id, "REJECTED")}
                disabled={isProcessing}
                title="Reject"
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
