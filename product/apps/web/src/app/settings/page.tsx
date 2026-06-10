import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, hasActiveSubscription } from "@/lib/auth";
import { SubscribeButton, TokenButton } from "./actions";

const INBOUND_DOMAIN = process.env.INBOUND_DOMAIN ?? "in.jobpilot.app";

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const alias = `u-${user.inboundSlug}@${INBOUND_DOMAIN}`;

  return (
    <main>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <b>JobPilot</b>
        <Link href="/dashboard">Jobs</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <h1>Settings</h1>

      <h2>Subscription</h2>
      <p>
        Status: <b>{user.subscriptionStatus}</b>
        {user.currentPeriodEnd &&
          ` (renews ${user.currentPeriodEnd.toDateString()})`}
      </p>
      {!hasActiveSubscription(user) && <SubscribeButton />}

      <h2>Your application email alias</h2>
      <p>
        Use this address when you apply for jobs (or set up a forwarding rule
        for job-related mail). Everything sent to it is triaged automatically
        — rejections filed, interview invites and action items flagged to you
        immediately:
      </p>
      <pre style={{ background: "#fff", border: "1px solid #e2e2e2", padding: 12, borderRadius: 8 }}>{alias}</pre>

      <h2>Profile</h2>
      <p>
        <Link href="/onboarding">Edit your CV and preferences →</Link>
      </p>

      <h2>Mobile app</h2>
      <p>
        Generate a personal access token and enter it in the JobPilot mobile
        app to keep web and mobile in sync. Generating a new token revokes the
        old one.
      </p>
      <TokenButton />
    </main>
  );
}
