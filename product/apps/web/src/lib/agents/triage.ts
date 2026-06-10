import { runAgent, responseJson, MODELS } from "./core";
import { type TriageResult, TriageResultSchema } from "./types";

const TRIAGE_JSON_SCHEMA = {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: [
        "rejection", "interview_invite", "recruiter_outreach",
        "application_receipt", "action_required", "other_job_related",
        "not_job_related",
      ],
    },
    company: { type: "string" },
    one_line_summary: { type: "string" },
    suggested_next_step: { type: "string" },
  },
  required: ["category", "company", "one_line_summary", "suggested_next_step"],
  additionalProperties: false,
};

const SYSTEM = `You triage a job-seeker's incoming email. Decide the category:
- rejection: an application was declined
- interview_invite: invitation to interview, assessment, or a recruiter call
  with a concrete proposed time
- recruiter_outreach: recruiter or hiring manager reaching out about a role
- application_receipt: automated "we received your application" confirmations
- action_required: anything needing a reply or action (offer, references,
  document requests, scheduling links awaiting a choice)
- other_job_related: job alerts, newsletters, job-board digests
- not_job_related: everything else

Be precise: an interview invite that needs the candidate to pick a slot is
action_required AND an invite — prefer action_required in that case.
company: best guess at the employer/agency, or "Unknown".
suggested_next_step: one short imperative sentence ("Reply with availability",
"No action needed").`;

export async function triageEmail(args: {
  from: string;
  subject: string;
  body: string;
}): Promise<TriageResult> {
  const response = await runAgent({
    model: MODELS.triage,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Triage this message:\n\nFrom: ${args.from}\nSubject: ${
          args.subject
        }\nBody: ${args.body.slice(0, 4000)}`,
      },
    ],
    schema: TRIAGE_JSON_SCHEMA,
    maxTokens: 4000,
  });
  return TriageResultSchema.parse(responseJson(response));
}
