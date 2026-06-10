"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cv, setCv] = useState("");
  const [titles, setTitles] = useState("");
  const [industries, setIndustries] = useState("");
  const [base, setBase] = useState("London, UK");
  const [country, setCountry] = useState("GB");
  const [minSalary, setMinSalary] = useState("");
  const [notes, setNotes] = useState("");
  const [remoteOk, setRemoteOk] = useState(true);
  const [contractOk, setContractOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cvMarkdown: cv,
        preferences: {
          targetTitles: titles.split("\n").map((s) => s.trim()).filter(Boolean),
          targetIndustries: industries.split("\n").map((s) => s.trim()).filter(Boolean),
          location: {
            base,
            countryCode: country,
            remoteOk,
            hybridOk: true,
            willingToRelocate: false,
          },
          compensation: {
            minimumSalary: minSalary,
            contractOk,
            minimumDayRate: "",
          },
          jobTypes: contractOk ? ["fulltime", "contract"] : ["fulltime"],
          searchNotes: notes,
          maxJobsPerDigest: 10,
          minMatchScore: 60,
        },
      }),
    });
    setBusy(false);
    if (res.ok) router.push("/settings?onboarded=1");
    else setError((await res.json()).error ?? "Could not save profile");
  }

  const field = { width: "100%", padding: 8, margin: "4px 0 16px", borderRadius: 6, border: "1px solid #ccc", fontFamily: "inherit" } as const;

  return (
    <main>
      <h1>Set up your job-search agent</h1>
      <form onSubmit={submit}>
        <label>
          <b>Your CV</b> (paste as text or markdown — the richer, the better the
          matching and tailoring)
          <textarea value={cv} onChange={(e) => setCv(e.target.value)} rows={14} style={field} required />
        </label>
        <label>
          <b>Target job titles</b> (one per line)
          <textarea value={titles} onChange={(e) => setTitles(e.target.value)} rows={4} style={field} required />
        </label>
        <label>
          <b>Target industries</b> (one per line, optional)
          <textarea value={industries} onChange={(e) => setIndustries(e.target.value)} rows={3} style={field} />
        </label>
        <label>
          <b>Base location</b>
          <input value={base} onChange={(e) => setBase(e.target.value)} style={field} required />
        </label>
        <label>
          <b>Country code</b> (e.g. GB, US)
          <input value={country} onChange={(e) => setCountry(e.target.value)} style={field} required />
        </label>
        <label>
          <b>Minimum salary</b> (e.g. &quot;GBP 120,000 / year&quot;)
          <input value={minSalary} onChange={(e) => setMinSalary(e.target.value)} style={field} />
        </label>
        <label style={{ display: "block", marginBottom: 8 }}>
          <input type="checkbox" checked={remoteOk} onChange={(e) => setRemoteOk(e.target.checked)} /> Remote roles OK
        </label>
        <label style={{ display: "block", marginBottom: 16 }}>
          <input type="checkbox" checked={contractOk} onChange={(e) => setContractOk(e.target.checked)} /> Open to contract roles
        </label>
        <label>
          <b>Anything else the agent should know?</b> (strong fits, things to avoid…)
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={field} />
        </label>
        {error && <p style={{ color: "#dc2626" }}>{error}</p>}
        <button
          type="submit"
          disabled={busy}
          style={{ fontSize: 16, padding: "10px 24px", background: "#1a56db", color: "#fff", border: 0, borderRadius: 8, cursor: "pointer" }}
        >
          {busy ? "Saving…" : "Save and continue"}
        </button>
      </form>
    </main>
  );
}
