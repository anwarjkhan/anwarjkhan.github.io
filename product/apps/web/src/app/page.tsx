import Link from "next/link";
import { auth, signIn } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();

  return (
    <main>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>JobPilot</h1>
      <p style={{ fontSize: 20, color: "#444", maxWidth: 560 }}>
        Your autonomous job-search agent. It hunts twice a day, scores every
        role against <em>your</em> CV, tailors your application to each job
        spec, and triages the replies — so you only spend time on interviews.
      </p>
      <ul style={{ fontSize: 16, color: "#333", lineHeight: 1.9 }}>
        <li>🎯 Twice-daily digest of fresh, scored job matches</li>
        <li>📄 One-click tailored CV, cover letter & Workday-ready text</li>
        <li>📬 A dedicated application inbox that sorts rejections, invites
          and recruiter outreach for you</li>
        <li>📱 Web and mobile, always in sync</li>
      </ul>
      {session?.user ? (
        <Link href="/dashboard" style={{ fontSize: 18 }}>
          Go to your dashboard →
        </Link>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/onboarding" });
          }}
        >
          <button
            type="submit"
            style={{
              fontSize: 18,
              padding: "12px 28px",
              background: "#1a56db",
              color: "#fff",
              border: 0,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Start free 7-day trial — sign in with Google
          </button>
        </form>
      )}
    </main>
  );
}
