import "server-only";
import { getDb } from "./client";

// profile Data type
export interface ProfileData {
  id: number;
  slug: string;
  jobrole: string | null;
  short_summary: string | null;
  bio_text: string | null;
  quote: string | null;
  cv_url: string | null;
  fullname: string;
  email: string;
  linkedin: string | null;
  github: string | null;
  phone: string | null;
}

// fetch the main profile info from the db
export function getProfileBySlug(slug: string): ProfileData {
  const db = getDb();
  return db
    .prepare(
      `
    SELECT
      profile.id,
      profile.slug,
      profile.jobrole,
      profile.short_summary,
      profile.bio_text,
      profile.quote,
      profile.cv_url,
      person.fullname,
      person.email,
      person.linkedin,
      person.github,
      person.phone
    FROM profile
    JOIN person ON person.id = profile.person_id
    WHERE profile.slug = ?
  `,
    )
    .get(slug);
}

export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  visibility: string;
  is_highlighted: number;
  repo_url: string | null;
  demo_url: string | null;
  img_url: string | null;
  skills: string[];
}

export function getProjectsForProfile(profileId: number): ProjectData[] {
  const db = getDb();
  const rows = db
    .prepare(
      `
    SELECT
      project.id, project.slug, project.title, project.summary,
      project.description, project.visibility,
      project.repo_url, project.demo_url, project.img_url,
      profile_project.sort_order,
      group_concat(skill.name) AS skill_names
    FROM profile_project
    JOIN project ON project.id = profile_project.project_id
    LEFT JOIN project_skill ON project_skill.project_id = project.id
    LEFT JOIN skill ON skill.id = project_skill.skill_id
    WHERE profile_project.profile_id = ?
    GROUP BY project.id
    ORDER BY profile_project.sort_order ASC
  `,
    )
    .all(profileId) as any[];

  return rows.map((r) => ({
    ...r,
    skills: r.skill_names ? r.skill_names.split(",") : [],
  })) as ProjectData[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export function getSkillGroups(): SkillGroup[] {
  const db = getDb();
  const rows = db
    .prepare(
      `
    SELECT name, type
    FROM skill
    ORDER BY type, sort_order, name
  `,
    )
    .all() as { name: string; type: string }[];

  // group by type, preserving order
  const groups: SkillGroup[] = [];
  for (const row of rows) {
    let g = groups.find((x) => x.group === row.type);
    if (!g) {
      g = { group: row.type, items: [] };
      groups.push(g);
    }
    g.items.push(row.name);
  }
  return groups;
}
export interface EntryData {
  id: number;
  role: string;
  org: string;
  description: string | null;
  time_from: string | null;
  time_until: string | null;
}

export function getExperience(): EntryData[] {
  const personId = 1;
  const db = getDb();
  return db
    .prepare(
      `
    SELECT id, role, org, description, time_from, time_until
    FROM experience
    WHERE person_id = ?
    ORDER BY time_from DESC
  `,
    )
    .all(personId) as EntryData[];
}

export function getEducation(): EntryData[] {
  const personId = 1;
  const db = getDb();
  return db
    .prepare(
      `
    SELECT id, role, org, description, time_from, time_until
    FROM education
    WHERE person_id = ?
    ORDER BY time_from DESC
  `,
    )
    .all(personId) as EntryData[];
}
