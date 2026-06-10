"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TailorButton({ jobId }: { jobId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function tailor() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/tailor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok) {
      router.push(`/packs/${data.packId}`);
    } else {
      setError(data.error ?? "Tailoring failed");
    }
  }

  return (
    <span>
      <button
        onClick={tailor}
        disabled={busy}
        style={{
          padding: "6px 14px",
          background: busy ? "#9ca3af" : "#1a56db",
          color: "#fff",
          border: 0,
          borderRadius: 6,
          cursor: busy ? "wait" : "pointer",
        }}
      >
        {busy ? "Tailoring… (1–3 min)" : "✨ Tailor my application"}
      </button>
      {error && <span style={{ color: "#dc2626", marginLeft: 8 }}>{error}</span>}
    </span>
  );
}
