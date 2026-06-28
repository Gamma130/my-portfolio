import "server-only";
import { getLlmStream, type Message } from "@/services/openAi";
import { buildFullDbContext } from "./dbContext";

const systemPrompt = `
You are an assistant answering questions about Marvin.
Use only the following facts about him. Do not invent anything.
If the answer is not in the facts, honestly say you don't know.
Answer factually and concisely, not promotionally. Always respond in English.
Use plain text with simple line breaks. You may use "-" for bullet lists, but do not use bold (**), headers (#), or other Markdown formatting.
`;

export async function* getBotStream(messages: Message[]) {
  const dbContext = buildFullDbContext();
  const instructions = `${systemPrompt}\n\nFACTS ABOUT MARVIN:\n${dbContext}`;

  const stream = await getLlmStream(messages, instructions);

  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      yield event.delta;
    }
  }
}
