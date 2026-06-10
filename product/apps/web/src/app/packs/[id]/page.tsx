import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { workdayText } from "@/lib/agents/tailor";
import { TailorResultSchema } from "@/lib/agents/types";

export default async function PackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  if (!user) redirect("/");
  const { id } = await params;
  const pack = await prisma.applicationPack.findFirst({
    where: { id, userId: user.id },
  });
  if (!pack) notFound();

  const workday = workdayText(
    TailorResultSchema.parse({
      job_title: pack.jobTitle,
      company: pack.company,
      fit_assessment: pack.fitAssessment,
      tailored_cv_markdown: pack.cvMarkdown,
      cover_letter: pack.coverLetter,
      workday: pack.workday,
    }),
  );

  const block = {
    whiteSpace: "pre-wrap",
    background: "#fff",
    border: "1px solid #e2e2e2",
    padding: 14,
    borderRadius: 8,
    fontSize: 14,
  } as const;

  return (
    <main>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <b>JobPilot</b>
        <Link href="/dashboard">Jobs</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <h1>
        {pack.jobTitle} — {pack.company}
      </h1>
      <p>
        <a href={pack.jobUrl} target="_blank" rel="noreferrer">
          View the job posting →
        </a>
      </p>
      <h2>Fit assessment</h2>
      <p>{pack.fitAssessment}</p>
      <h2>Tailored CV (markdown — copy into your editor)</h2>
      <pre style={block}>{pack.cvMarkdown}</pre>
      <h2>Cover letter</h2>
      <pre style={block}>{pack.coverLetter}</pre>
      <h2>Workday / ATS cut-and-paste</h2>
      <pre style={block}>{workday}</pre>
    </main>
  );
}
