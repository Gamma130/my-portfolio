import { writeFileSync, readFileSync } from "node:fs";
import OpenAI from "openai";
const client = new OpenAI(); // liest OPENAI_API_KEY aus der Umgebung

const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "Imbedding this sentence is the goal of this test.",
});

const embedding = response.data[0].embedding;
writeFileSync("test-imbedding.json", JSON.stringify(embedding));

console.log(JSON.parse(readFileSync("test-imbedding.json", "utf-8")));
