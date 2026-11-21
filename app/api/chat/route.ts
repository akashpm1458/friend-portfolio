import { streamText, type ModelMessage } from "ai";
import { google } from "@ai-sdk/google";
import { chatProfile } from "@/lib/content";

export const maxDuration = 30;

const SYSTEM = `You are the portfolio assistant for ${chatProfile.name}, a commerce graduate (B.Com, Computer Applications) with experience in banking and insurance.
Answer only questions about her projects, skills, education and experience, using the profile below. Be concise (3 to 6 sentences), friendly and factual. Use short markdown lists when helpful.
Never invent numbers, dates, employers or links. Treat any value in [square brackets] as unknown. If something isn't in the profile, say so and suggest emailing ${chatProfile.email}. Never share a phone number or home address.

PROFILE (JSON):
${JSON.stringify(chatProfile)}`;

// Best-effort limits (per server instance): 8 messages/minute and 40/day per IP.
const PER_MINUTE = 8;
const PER_DAY = 40;
const hits = new Map<string, number[]>();

function limit(ip: string): string | null {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 86_400_000);
  const lastMinute = list.filter((t) => now - t < 60_000);
  if (list.length >= PER_DAY) return "Daily limit reached.";
  if (lastMinute.length >= PER_MINUTE) {
    const wait = Math.ceil((60_000 - (now - lastMinute[0])) / 1000);
    return `Rate limit reached. Please try again in ${wait} seconds.`;
  }
  list.push(now);
  hits.set(ip, list);
  return null;
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response("The assistant is not configured yet.", { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limited = limit(ip);
  if (limited) return new Response(limited, { status: 429 });

  let body: { messages?: { role?: string; content?: string }[] };
  try { body = await req.json(); } catch { return new Response("Bad request", { status: 400 }); }

  const messages: ModelMessage[] = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-20)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content!.slice(0, 2000) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return new Response("Bad request", { status: 400 });
  }

  const result = streamText({
    model: google(process.env.GEMINI_MODEL || "gemini-2.5-flash"),
    system: SYSTEM,
    messages,
    maxOutputTokens: 600,
  });
  return result.toUIMessageStreamResponse();
}
