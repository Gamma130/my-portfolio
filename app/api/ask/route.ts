import { checkRateLimit } from "@/lib/rateLimits";
import { getBotStream } from "@/ai/chatBot";
import type { Message } from "@/services/openAi";

export async function POST(request: Request) {
  const rLimit = checkRateLimit();

  if (!rLimit.allowed) {
    return new Response(
      JSON.stringify({
        error: "rate_limited",
        message:
          "The assistant is taking a short break. It's had a lot of questions this hour. Please try again shortly.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(rLimit.limit),
          "X-RateLimit-Remaining": String(rLimit.remaining),
          "Retry-After": String(rLimit.resetInSeconds),
        },
      },
    );
  }

  let messages: Message[];

  try {
    const body = await request.json();
    messages = body.messages;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of getBotStream(messages)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch {
        controller.enqueue(encoder.encode("\n[Error generating response]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
