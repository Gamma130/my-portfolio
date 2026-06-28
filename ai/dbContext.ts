import "server-only";
import { getDb } from "@/lib/db/client";

export function buildFullDbContext(): string {
  const db = getDb();

  const projects = db
    .prepare(`SELECT title, summary, description FROM project`)
    .all() as any[];
  const experience = db
    .prepare(
      `SELECT role, org, description, time_from, time_until FROM experience`,
    )
    .all() as any[];
  const education = db
    .prepare(
      `SELECT role, org, description, time_from, time_until FROM education`,
    )
    .all() as any[];
  const skills = db.prepare(`SELECT name, type FROM skill`).all() as any[];
  const profile = db
    .prepare(`SELECT bio_text FROM profile WHERE slug = 'fullstack-ai'`)
    .get() as any;

  let context = "";

  context += `## About Marvin \n${profile?.bio_text ?? ""}\n\n`;

  context += `## Projects\n`;
  for (const p of projects) {
    context += `- ${p.title}: ${p.summary ?? ""}. ${p.description ?? ""}\n`;
  }

  context += `\n## Work Experience\n`;
  for (const e of experience) {
    context += `- ${e.role} bei ${e.org} (${e.time_from}–${e.time_until ?? "heute"}): ${e.description ?? ""}\n`;
  }

  context += `\n## Education\n`;
  for (const e of education) {
    context += `- ${e.role}, ${e.org} (${e.time_from}–${e.time_until ?? "heute"})\n`;
  }

  context += `\n## Skills\n`;
  for (const s of skills) {
    context += `- ${s.name} (${s.type})\n`;
  }

  return context;
}
