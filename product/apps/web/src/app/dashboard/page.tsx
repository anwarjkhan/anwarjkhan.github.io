import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, hasActiveSubscription } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TailorButton } from "./tailor-button";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) redirect("/onboarding");

  const [jobs, events] = await Promise.all([
    prisma.job.findMany({
      where: { userId: user.id },
      orderBy: [{ createdAt: "desc" }, { matchScore: "desc" }],
      take: 30,
    }),
    prisma.emailEvent.findMany({
      where: { userId: user.id, category: { not: "not_job_related" } },
      orderBy: { receivedAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <main>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <b>JobPilot</b>
        <Link href="/dashboard">Jobs</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      {!hasActiveSubscription(user) && (
        <p style={{ background: "#fef3c7", padding: 12, borderRadius: 8 }}>
          No active subscription — searches are paused.{" "}
          <Link href="/settings">Subscribe in Settings →</Link>
        </p>
      )}

      <h2>Job matches</h2>
      {jobs.length === 0 && (
        <p>No matches yet — your first digest arrives after the next search
        run (twice daily).</p>
      )}
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #e2e2e2",
            borderRadius: 10,
            padding: 16,
            margin: "12px 0",
            background: "#fff",
          }}
        >
          <div style={{ fontWeight: 700 }}>
            <a href={job.url} target="_blank" rel="noreferrer">
              {job.title}
            </a>{" "}
            <span style={{ float: "right", color: job.matchScore >= 80 ? "#16a34a" : "#ca8a04" }}>
              {job.matchScore}% match · {job.status}
            </span>
          </div>
          <div style={{ color: "#444", margin: "4px 0" }}>
            {job.company} · {job.location} · {job.salary} · {job.posted}
          </div>
          <p style={{ margin: "8px 0" }}>{job.summary}</p>
          <TailorButton jobId={job.id} />
        </div>
      ))}

      <h2 style={{ marginTop: 32 }}>Inbox triage</h2>
      {events.length === 0 && (
        <p>
          Nothing triaged yet. Give recruiters your application alias (see
          Settings) and replies will be sorted here automatically.
        </p>
      )}
      <ul>
        {events.map((e) => (
          <li key={e.id} style={{ margin: "8px 0" }}>
            <b>[{e.category.replace(/_/g, " ")}]</b> {e.company}: {e.summary}{" "}
            <i>→ {e.nextStep}</i>
          </li>
        ))}
      </ul>
    </main>
  );
}
