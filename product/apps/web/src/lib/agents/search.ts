import { createHash } from "crypto";
import { runAgent, responseJson, MODELS, WEB_TOOLS } from "./core";
import {
  type Preferences,
  type SearchResult,
  SearchResultSchema,
} from "./types";

const JOBS_JSON_SCHEMA = {
  type: "object",
  properties: {
    jobs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          salary: { type: "string" },
          url: { type: "string" },
          source: { type: "string" },
          posted: { type: "string" },
          summary: { type: "string" },
          match_score: { type: "integer" },
          match_reasons: { type: "array", items: { type: "string" } },
        },
        required: [
          "title", "company", "location", "salary", "url",
          "source", "posted", "summary", "match_score", "match_reasons",
        ],
        additionalProperties: false,
      },
    },
    market_notes: { type: "string" },
  },
  required: ["jobs", "market_notes"],
  additionalProperties: false,
};

const SYSTEM = `You are an expert job-search agent working for one candidate.
You search the live web for job postings that match the candidate's profile
and CV, then return a structured shortlist.

Rules:
- Search multiple sources: LinkedIn, Indeed, eFinancialCareers, company career
  pages, Otta/Welcome to the Jungle, and country-relevant job boards. Run
  several distinct searches.
- Only include postings that appear to be live and recent (last ~14 days).
- The url field MUST be the direct link to the specific posting, never a
  search-results page. Keep URL query parameters intact.
- Score match_score 0-100 against the CV and preferences: seniority fit,
  domain fit, location, salary vs the stated floor. Be honest, not generous.
- match_reasons: 2-4 short bullets explaining the score, referencing the CV.
- salary: as advertised; "Not stated" if absent.
- Exclude obvious duplicates and anything in the provided already-seen list.
- market_notes: 2-3 sentences on what you observed in the market today.`;

export function dedupeKey(job: { company: string; title: string }): string {
  const basis = `${job.company}|${job.title}`.toLowerCase().trim();
  return createHash("sha256").update(basis).digest("hex").slice(0, 16);
}

export async function searchJobs(args: {
  preferences: Preferences;
  cvMarkdown: string;
  seen: { title: string; company: string }[];
}): Promise<SearchResult> {
  const seenList =
    args.seen
      .slice(-150)
      .map((s) => `- ${s.title} at ${s.company}`)
      .join("\n") || "(none yet)";

  const prompt = `Find current job postings for this candidate.

## Preferences
${JSON.stringify(args.preferences, null, 2)}

## Additional guidance
${args.preferences.searchNotes}

## CV
${args.cvMarkdown}

## Already seen — do NOT include these again
${seenList}

Today is ${new Date().toISOString().slice(0, 10)}. Search now and return the
shortlist as JSON.`;

  const response = await runAgent({
    model: MODELS.search,
    system: SYSTEM,
    messages: [{ role: "user", content: prompt }],
    tools: WEB_TOOLS,
    schema: JOBS_JSON_SCHEMA,
    maxTokens: 32000,
  });
  return SearchResultSchema.parse(responseJson(response));
}
