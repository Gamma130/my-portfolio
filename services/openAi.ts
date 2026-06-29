import "server-only";
import OpenAI from "openai";

let client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export type Message = { role: "user" | "assistant"; content: string };

export async function getLlmStream(messages: Message[], instructions?: string) {
  try {
    const stream = await getClient().responses.create({
      model: "gpt-5.4-nano",
      instructions,
      input: messages,
      stream: true,
    });
    return stream;
  } catch (e) {
    throw new Error("OpenAI stream call failed", { cause: e });
  }
}
