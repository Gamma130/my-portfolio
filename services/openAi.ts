import "server-only";
import OpenAI from "openai";

const client = new OpenAI();

export type Message = { role: "user" | "assistant"; content: string };

export async function getLlmStream(messages: Message[], instructions?: string) {
  try {
    const stream = await client.responses.create({
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
