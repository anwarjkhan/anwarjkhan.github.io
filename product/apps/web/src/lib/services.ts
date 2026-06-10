import type { User } from "@prisma/client";
import { prisma } from "./db";
import { searchJobs, dedupeKey } from "./agents/search";
import { tailorApplication } from "./agents/tailor";
import { PreferencesSchema } from "./agents/types";
import { sendDigestEmail } from "./email";

/** Run the search agent for one user, persist new jobs, send the digest. */
export async function runSearchForUser(user: User): Promise<number> {
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) return 0;
  const preferences = PreferencesSchema.parse(profile.preferences);

  const seen = await prisma.job.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 150,
    select: { title: true, company: true, dedupeKey: true },
  });
  const seenKeys = new Set(seen.map((s) => s.dedupeKey));

  const result = await searchJobs({
    preferences,
    cvMarkdown: profile.cvMarkdown,
    seen,
  });

  const fresh = result.jobs
    .filter(
      (j) =>
        j.match_score >= preferences.minMatchScore &&
        !seenKeys.has(dedupeKey(j)),
    )
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, preferences.maxJobsPerDigest);

  const created = await Promise.all(
    fresh.map((j) =>
      prisma.job.create({
        data: {
          userId: user.id,
          dedupeKey: dedupeKey(j),
          title: j.title,
          company: j.company,
          location: j.location,
          salary: j.salary,
          url: j.url,
          source: j.source,
          posted: j.posted,
          summary: j.summary,
          matchScore: j.match_score,
          matchReasons: j.match_reasons,
        },
      }),
    ),
  );

  if (created.length > 0 && profile.digestEmail) {
    await sendDigestEmail({
      to: user.email,
      jobs: fresh.map((j, i) => ({ ...j, id: created[i].id })),
      marketNotes: result.market_notes,
    });
  }
  return created.length;
}

/** Run the tailoring agent for one user and persist the application pack. */
export async function runTailorForUser(
  user: User,
  args: { jobId?: string; jobUrl?: string; notes?: string },
) {
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });
  if (!profile) throw new Error("Complete onboarding first.");

  let jobUrl = args.jobUrl;
  let jobId: string | undefined;
  if (args.jobId) {
    const job = await prisma.job.findFirst({
      where: { id: args.jobId, userId: user.id },
    });
    if (!job) throw new Error("Job not found.");
    jobUrl = job.url;
    jobId = job.id;
  }
  if (!jobUrl) throw new Error("Provide jobId or jobUrl.");

  const result = await tailorApplication({
    cvMarkdown: profile.cvMarkdown,
    jobUrl,
    notes: args.notes,
  });

  const pack = await prisma.applicationPack.create({
    data: {
      userId: user.id,
      jobId,
      jobUrl,
      jobTitle: result.job_title,
      company: result.company,
      fitAssessment: result.fit_assessment,
      cvMarkdown: result.tailored_cv_markdown,
      coverLetter: result.cover_letter,
      workday: result.workday,
    },
  });
  if (jobId) {
    await prisma.job.update({
      where: { id: jobId },
      data: { status: "tailored" },
    });
  }
  return pack;
}
