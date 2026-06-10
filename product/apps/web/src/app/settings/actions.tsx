"use client";

import { useState } from "react";

const button = {
  fontSize: 15,
  padding: "8px 18px",
  background: "#1a56db",
  color: "#fff",
  border: 0,
  borderRadius: 6,
  cursor: "pointer",
} as const;

export function SubscribeButton() {
  const [busy, setBusy] = useState(false);
  async function go() {
    setBusy(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setBusy(false);
  }
  return (
    <button onClick={go} disabled={busy} style={button}>
      {busy ? "Redirecting…" : "Start subscription (7-day free trial)"}
    </button>
  );
}

export function TokenButton() {
  const [token, setToken] = useState<string | null>(null);
  async function generate() {
    const res = await fetch("/api/token", { method: "POST" });
    const data = await res.json();
    setToken(data.apiToken ?? null);
  }
  return (
    <div>
      <button onClick={generate} style={button}>
        Generate mobile token
      </button>
      {token && (
        <pre style={{ background: "#fff", border: "1px solid #e2e2e2", padding: 12, borderRadius: 8 }}>
          {token}
        </pre>
      )}
    </div>
  );
}
