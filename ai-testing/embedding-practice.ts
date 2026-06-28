import OpenAI from "openai";
const client = new OpenAI(); // liest OPENAI_API_KEY aus der Umgebung

async function embed(sentences) {
  const r = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: sentences,
  });
  return r;
}

// Kosinus-Ähnlichkeit: wie "nah" sind sich zwei Vektoren?
function similarity(a, b) {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

const sentences = [
  "Ich programmiere KI-Anwendungen.",
  "Vögel fliegen im Winter in den Süden.",
  "Der 21. Juni ist der längste Tag.",
  "Der 22. Dezember ist der kürzeste Tag.",
  "Das Jahr hat 12 Monate.",
  "Ein Tag hat 24 Stunden.",
  "Das Jahr hat 365 Tage.",
];

const response = await embed(sentences);

const store = sentences.map((text, i) => ({
  text,
  embedding: response.data[i].embedding,
}));

const Frage_a = "Was ist der 21. Dezember?";
const frage_response = await embed(Frage_a);
const Frage_a_embedding = frage_response.data[0].embedding;

let best_hit = 0;
let awnser = "";
for (const sentense of store) {
  const new_similarity = similarity(Frage_a_embedding, sentense.embedding);
  if (new_similarity > best_hit) {
    best_hit = new_similarity;
    awnser = sentense.text;
  }
}
console.log("Question: ", Frage_a);
console.log("Awnser: ", awnser);
