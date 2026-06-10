import { runAgent, responseJson, MODELS, WEB_TOOLS } from "./core";
import { type TailorResult, TailorResultSchema } from "./types";

const TAILOR_JSON_SCHEMA = {
  type: "object",
  properties: {
    job_title: { type: "string" },
    company: { type: "string" },
    fit_assessment: { type: "string" },
    tailored_cv_markdown: { type: "string" },
    cover_letter: { type: "string" },
    workday: {
      type: "object",
      properties: {
        professional_summary: { type: "string" },
        work_experience_entries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              job_title: { type: "string" },
              company: { type: "string" },
              from_to: { type: "string" },
              role_description: { type: "string" },
            },
            required: ["job_title", "company", "from_to", "role_description"],
            additionalProperties: false,
          },
        },
        skills_list: { type: "array", items: { type: "string" } },
        why_this_company: { type: "string" },
        screening_answer_tips: { type: "string" },
      },
      required: [
        "professional_summary", "work_experience_entries", "skills_list",
        "why_this_company", "screening_answer_tips",
      ],
      additionalProperties: false,
    },
  },
  required: [
    "job_title", "company", "fit_assessment", "tailored_cv_markdown",
    "cover_letter", "workday",
  ],
  additionalProperties: false,
};

const SYSTEM = `You are an expert CV writer and career coach. Given a job
posting URL and the candidate's master CV, produce application materials
precisely aligned to the job specification.

Rules:
- Fetch the job posting first and base everything on its actual wording.
  If the URL is dead, search for the same posting elsewhere before giving up.
- Never invent experience, employers, dates, or qualifications. Reframe and
  re-prioritise only what is in the master CV.
- Mirror the job spec's key terminology (important for ATS keyword matching)
  wherever the CV genuinely supports it.
- tailored_cv_markdown: the full CV, reordered and reworded for this role,
  achievement-led, ready to export.
- cover_letter: ~300 words, specific to the company and role, no clichés.
- workday: plain text only, no markdown syntax — these blocks get pasted into
  Workday/ATS form fields verbatim. role_description fields should be 3-5
  achievement bullets separated by newlines, each starting with "- ".
- fit_assessment: 2-3 honest sentences on fit, including any gaps and how to
  address them.`;

export async function tailorApplication(args: {
  cvMarkdown: string;
  jobUrl: string;
  notes?: string;
}): Promise<TailorResult> {
  const prompt = `Job posting URL: ${args.jobUrl}

Candidate notes for this application: ${args.notes || "(none)"}

## Master CV
${args.cvMarkdown}

Fetch the posting, then produce the tailored application materials as JSON.`;

  const response = await runAgent({
    model: MODELS.tailor,
    system: SYSTEM,
    messages: [{ role: "user", content: prompt }],
    tools: WEB_TOOLS,
    schema: TAILOR_JSON_SCHEMA,
    maxTokens: 64000,
  });
  return TailorResultSchema.parse(responseJson(response));
}

export function workdayText(result: TailorResult): string {
  const w = result.workday;
  const lines = [
    "WORKDAY / ATS CUT-AND-PASTE PACK",
    `${result.job_title} — ${result.company}`,
    "=".repeat(60),
    "",
    ">>> PROFESSIONAL SUMMARY",
    w.professional_summary,
    "",
    ">>> WORK EXPERIENCE ENTRIES",
  ];
  for (const entry of w.work_experience_entries) {
    lines.push(
      "",
      `Job title : ${entry.job_title}`,
      `Company   : ${entry.company}`,
      `Dates     : ${entry.from_to}`,
      "Description:",
      entry.role_description,
    );
  }
  lines.push(
    "",
    ">>> SKILLS (add individually)",
    w.skills_list.join("\n"),
    "",
    ">>> WHY THIS COMPANY",
    w.why_this_company,
    "",
    ">>> SCREENING QUESTION TIPS",
    w.screening_answer_tips,
  );
  return lines.join("\n");
}
