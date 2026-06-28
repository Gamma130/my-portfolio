import * as sqliteVec from "sqlite-vec";
import Database from "better-sqlite3";
import OpenAI from "openai";
const client = new OpenAI();

const db = new Database(":memory:");
sqliteVec.load(db);

db.exec(`
  CREATE VIRTUAL TABLE vec_sentences USING vec0(
    embedding float[1536]
  );
`);
db.exec(`
  CREATE TABLE sentences (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL
  );
`);

async function embed(sentences) {
  const r = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: sentences,
  });
  return r;
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

const insertText = db.prepare("INSERT INTO sentences (id, text) VALUES (?, ?)");
const insertVec = db.prepare(
  "INSERT INTO vec_sentences (rowid, embedding) VALUES (?, ?)",
);

const store = sentences.map((text, i) => ({
  text,
  embedding: response.data[i].embedding,
}));

store.forEach((item, i) => {
  const id = i + 1;
  insertText.run(id, item.text);
  insertVec.run(BigInt(id), JSON.stringify(item.embedding));
});

const frage = "Wie viele Tage hat ein Jahr?";
const frageResponse = await embed(frage);
const frageEmbedding = frageResponse.data[0].embedding;

const results = db
  .prepare(
    `
  WITH matches AS (
    SELECT rowid, distance
    FROM vec_sentences
    WHERE embedding MATCH ?
    ORDER BY distance
    LIMIT 3
  )
  SELECT sentences.text, matches.distance
  FROM matches
  JOIN sentences ON sentences.id = matches.rowid
  ORDER BY matches.distance
`,
  )
  .all(JSON.stringify(frageEmbedding));

console.log(results);
