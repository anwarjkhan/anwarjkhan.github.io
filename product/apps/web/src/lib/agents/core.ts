import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY

export const MODELS = {
  search: process.env.MODEL_SEARCH ?? "claude-opus-4-8",
  tailor: process.env.MODEL_TAILOR ?? "claude-opus-4-8",
  triage: process.env.MODEL_TRIAGE ?? "claude-opus-4-8",
};

type RunOptions = {
  model: string;
  system: string;
  messages: Anthropic.MessageParam[];
  tools?: Anthropic.Messages.ToolUnion[];
  schema?: Record<string, unknown>;
  maxTokens?: number;
  maxContinuations?: number;
};

/**
 * Stream a request (optionally with server-side tools and a JSON output
 * schema), resuming across pause_turn until the model finishes.
 */
export async function runAgent(opts: RunOptions): Promise<Anthropic.Message> {
  const {
    model,
    system,
    tools,
    schema,
    maxTokens = 16000,
    maxContinuations = 8,
  } = opts;

  let messages = [...opts.messages];
  let response: Anthropic.Message;
  for (let i = 0; ; i++) {
    const stream = anthropic.messages.stream({
      model,
      max_tokens: maxTokens,
      system,
      thinking: { type: "adaptive" },
      ...(tools ? { tools } : {}),
      ...(schema
        ? { output_config: { format: { type: "json_schema" as const, schema } } }
        : {}),
      messages,
    });
    response = await stream.finalMessage();
    if (response.stop_reason !== "pause_turn" || i >= maxContinuations) break;
    // Server-side tool loop hit its iteration limit — resume.
    messages = [...messages, { role: "assistant", content: response.content }];
  }
  if (response.stop_reason === "refusal") {
    throw new Error("Model refused the request.");
  }
  return response;
}

export function responseText(response: Anthropic.Message): string {
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

export function responseJson<T>(response: Anthropic.Message): T {
  return JSON.parse(responseText(response)) as T;
}

export const WEB_TOOLS: Anthropic.Messages.ToolUnion[] = [
  { type: "web_search_20260209", name: "web_search" },
  { type: "web_fetch_20260209", name: "web_fetch" },
];
