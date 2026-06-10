import { z } from "zod";

/** User-editable search preferences, stored as Profile.preferences JSON. */
export const PreferencesSchema = z.object({
  targetTitles: z.array(z.string()).min(1),
  targetIndustries: z.array(z.string()).default([]),
  location: z.object({
    base: z.string(),
    countryCode: z.string().default("GB"),
    remoteOk: z.boolean().default(true),
    hybridOk: z.boolean().default(true),
    willingToRelocate: z.boolean().default(false),
  }),
  compensation: z.object({
    minimumSalary: z.string().default(""),
    contractOk: z.boolean().default(false),
    minimumDayRate: z.string().default(""),
  }),
  jobTypes: z.array(z.string()).default(["fulltime"]),
  searchNotes: z.string().default(""),
  maxJobsPerDigest: z.number().int().min(1).max(25).default(10),
  minMatchScore: z.number().int().min(0).max(100).default(60),
});
export type Preferences = z.infer<typeof PreferencesSchema>;

export const FoundJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  salary: z.string(),
  url: z.string(),
  source: z.string(),
  posted: z.string(),
  summary: z.string(),
  match_score: z.number(),
  match_reasons: z.array(z.string()),
});
export type FoundJob = z.infer<typeof FoundJobSchema>;

export const SearchResultSchema = z.object({
  jobs: z.array(FoundJobSchema),
  market_notes: z.string(),
});
export type SearchResult = z.infer<typeof SearchResultSchema>;

export const TailorResultSchema = z.object({
  job_title: z.string(),
  company: z.string(),
  fit_assessment: z.string(),
  tailored_cv_markdown: z.string(),
  cover_letter: z.string(),
  workday: z.object({
    professional_summary: z.string(),
    work_experience_entries: z.array(
      z.object({
        job_title: z.string(),
        company: z.string(),
        from_to: z.string(),
        role_description: z.string(),
      }),
    ),
    skills_list: z.array(z.string()),
    why_this_company: z.string(),
    screening_answer_tips: z.string(),
  }),
});
export type TailorResult = z.infer<typeof TailorResultSchema>;

export const TriageResultSchema = z.object({
  category: z.enum([
    "rejection",
    "interview_invite",
    "recruiter_outreach",
    "application_receipt",
    "action_required",
    "other_job_related",
    "not_job_related",
  ]),
  company: z.string(),
  one_line_summary: z.string(),
  suggested_next_step: z.string(),
});
export type TriageResult = z.infer<typeof TriageResultSchema>;
