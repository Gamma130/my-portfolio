-- Seed: Fullstack-AI Developer profile (Marvin Nitschke)
-- Apply with:  sqlite3 portfolio.db < seed.sql   (run schema.sql first on a fresh db)
--
-- Adjust before going live:
--   * person.github            -> your GitHub URL (left NULL)
--   * profile.cv_url           -> hosted CV link   (left NULL)
--   * project 'rugby-bundesliga'.demo_url -> the live site URL (left NULL)
--   * skill.experience levels  -> subjective; defaults are estimates, esp. Next.js (beginner)
--   * education 'Abitur'.org    -> your school name (placeholder 'TODO: Schulname'; org is NOT NULL)

PRAGMA foreign_keys = ON;

BEGIN;

-- ---------- PERSON ----------
INSERT INTO person (id, fullname, email, linkedin, github, phone) VALUES
  (1, 'Marvin Nitschke', 'marvin.nitschke@gmail.com',
   'https://linkedin.com/in/marvin-nitschke-775251356', NULL, '+49 174 167 7320');

-- ---------- PROFILE ----------
INSERT INTO profile (id, person_id, slug, jobrole, short_summary, quote, bio_text, cv_url) VALUES
  (1, 1, 'fullstack-ai', 'Full-Stack Engineer · AI Applications',
   'Full-stack engineer building AI applications and web systems that run in production, used to owning them end to end from first requirement to release.',
   'What I enjoy most is getting to the bottom of a technical problem and then making it clear to the people who need to understand it.',
   'Full-Stack Engineer (TypeScript, React, Python) with experience building AI applications and web systems that run in production. Co-founder of Kether OS, where I built and shipped LLM-based systems and agent pipelines. Used to owning projects end to end, from requirements through development to release.',
   NULL);

-- ---------- EXPERIENCE (objective career, shared across all profiles) ----------
INSERT INTO experience (id, person_id, role, org, description, time_from, time_until) VALUES
  (1, 1, 'Co-Founder & Fullstack/AI Engineer', 'Kether OS',
   'AI applications and web systems for DACH B2B clients. Built frontend and APIs, contributed to the technical infrastructure, and owned client contact and project responsibility for several B2B AI projects.',
   '2025-08', NULL),
  (2, 1, 'Tutor (Physics)', 'TU Berlin',
   'Led two weekly tutorial groups and co-developed problem sets and final exams. 60 hours/month over 3+ years.',
   '2022-04', '2025-10');

-- ---------- EDUCATION (objective career, shared across all profiles) ----------
INSERT INTO education (id, person_id, role, org, description, time_from, time_until) VALUES
  (1, 1, 'B.Sc. Physics', 'TU Berlin',
   'Final grade 1.4. Focus: Computational Physics. Thesis: "Time delay in active colloids with social interactions" (Prof. Holger Stark). Advanced coursework in Machine Learning.',
   '2019-10', '2025-06'),
  (2, 1, 'Abitur', 'TODO: Schulname',   -- org is NOT NULL; fill in your school
   'Final grade 1.7. Advanced courses: Physics, Mathematics.',
   NULL, '2019');

-- ---------- PROJECTS ----------
INSERT INTO project (id, slug, person_id, title, summary, description, visibility, is_highlighted, repo_url, demo_url, img_url) VALUES
  (1, 'kether-internal-ai-app', 1, 'Kether OS Internal AI Application',
   'Internal product at Kether OS.',
   'Built a sliding-panel UX where the AI acts alongside the user on the page (agents, workflows, tickets). Designed the security architecture with identity & access management (Keycloak), an Apache gateway, and OAuth2/JWT for the micro-backends.',
   'public', 1, NULL, NULL, NULL),

  (2, 'ai-agent-pipeline-leadgen', 1, 'AI Agent Pipeline for Lead Generation',
   'Agent pipeline turning unstructured web data into structured output.',
   'Yellow-Pages scraping, web-search-augmented AI enrichment (context engineering, schema-validated outputs), deduplication, and export to a sheet. Built with the OpenAI Agents SDK.',
   'public', 1, NULL, NULL, NULL),

  (3, 'adplorer-ai-ad-generation', 1, 'Adplorer AI Ad-Generation Module',
   'Production project for a DACH ad-tech agency.',
   'LLM-based ad-generation system for Meta and Google Ads, live in production. As project manager and main client contact, owned it from requirements to delivery.',
   'public', 1, NULL, NULL, NULL),

  (4, 'rugby-bundesliga', 1, 'Rugby Bundesliga',
   'First official website of the Rugby Bundesliga.',
   'Built frontend and backend (React, Python) end to end in a team of two, including third-party integrations, mobile-first design, and stakeholder coordination.',
   'public', 1, NULL, NULL, NULL),

  (5, 'portfolio-page', 1, 'Portfolio Page',
   'This site — a SQLite-backed portfolio with curated, per-role profiles.',
   'A normalized SQLite schema drives multiple curated profiles over a single dataset, so each role (full-stack, security, computational) gets its own tailored view of the same projects and skills. Built as both my portfolio and a showcase project.',
   'public', 0, NULL, NULL, NULL);

-- ---------- PROJECT BODIES (markdown) ----------
-- Draft detail text per project (dev stage; iterate freely). Honest to each real role.

UPDATE project SET body_md =
'Internal product at Kether OS that puts an AI assistant **on the page, next to the user** — not in a separate chat window.

## What it does
A sliding side-panel lets the AI act alongside the user on whatever they are working on: running agents, driving workflows, and creating tickets in context.

## My part
- Built the sliding-panel frontend and the in-context interaction model.
- Designed the **security architecture** for the multi-service backend:
  - **Keycloak** for identity & access management (IAM)
  - an **Apache gateway** as the single entry point
  - **OAuth2 / JWT** validated per request across the micro-backends

## Why it matters
Auth is enforced **end to end** along the whole request path — gateway to identity layer to per-backend token validation — not just at a single edge.

_Internal / client work — code not public._'
WHERE slug = 'kether-internal-ai-app';

UPDATE project SET body_md =
'An agent pipeline that turns **unstructured web data into clean, structured records**.

## Pipeline
1. **Scrape** — collect raw listings from Yellow-Pages-style sources.
2. **Enrich** — a web-search-augmented agent fills in and verifies details.
3. **Structure** — outputs are **schema-validated**, so every record has a known shape.
4. **Dedup & export** — records are de-duplicated and written to a sheet.

## Engineering notes
- Built with the **OpenAI Agents SDK**; the flow is composed of discrete agents (query planning, discovery, enrichment, outreach).
- **Context engineering**: prompts carry explicit extraction priorities so the model returns fields, not prose.
- FastAPI, Postgres, Redis and Docker underneath.

_Internal prototype — code not public._'
WHERE slug = 'ai-agent-pipeline-leadgen';

UPDATE project SET body_md =
'An **LLM-based ad-generation system** for Meta and Google Ads — **live in production** for a DACH ad-tech agency.

## The project
The module generates ad creatives for campaigns and is integrated into the agency''s existing workflow.

## My role
I ran this as **project manager and main client contact**, owning it from **requirements through to delivery**:
- clarified requirements with the client and turned them into scope,
- coordinated the technical delivery,
- saw it through to a production launch.

## Status
Shipped and running in production.

_Client project — code not public._'
WHERE slug = 'adplorer-ai-ad-generation';

UPDATE project SET body_md =
'The **first official website of the Rugby Bundesliga**, built end to end in a **team of two**.

## What we built
- Public league site with fixtures, results and club information.
- **Frontend in React**, **backend in Python**.
- Third-party integrations for league data.
- **Mobile-first**, responsive design.

## My part
Worked across the **full stack** — frontend and backend — plus coordination with the league as stakeholder.

## Status
Live and public.'
WHERE slug = 'rugby-bundesliga';

UPDATE project SET body_md =
'This site — and a project in its own right. Built **solo, end to end: from data model to deployment**.

## Idea
One dataset, **multiple curated profiles**. A normalized SQLite schema lets each role (full-stack, security, computational) show its own tailored selection and ordering of the same projects and skills.

## Stack & decisions
- **Next.js with server-side rendering**, chosen deliberately so the page ships real **HTML** rather than only a JS bundle — which keeps it crawlable and readable in link previews.
- **SQLite** with a normalized schema (person, profiles, projects, skills, and their many-to-many links).
- Projects carry a `visibility` flag, so client and internal work can be **described without exposing code**.

## Why I built it
To prove to myself I could take a project **all the way alone** — design, build, deploy — and to have a living showcase I can keep iterating on.'
WHERE slug = 'portfolio-page';

-- ---------- SKILLS ----------
-- type is one of: languages | frontend | backend | tools
-- (schema has no 'infrastructure' type, so Docker/Nginx/CI-CD/Linux live under 'tools')
INSERT INTO skill (id, name, description, type, experience, sort_order) VALUES
  -- languages
  ( 1, 'Python',                         NULL, 'languages',  'experienced',  1),
  ( 2, 'TypeScript',                     NULL, 'languages',  'experienced',  2),
  ( 3, 'C',                              NULL, 'languages',  'beginner',     3),
  ( 4, 'Bash',                           NULL, 'languages',  'intermediate', 4),
  ( 5, 'LaTeX',                          NULL, 'languages',  'intermediate', 5),
  -- frontend
  ( 6, 'React',                          NULL, 'frontend',   'experienced',  6),
  ( 7, 'Next.js',                        NULL, 'frontend',   'beginner',     7),
  ( 8, 'HTML5',                          NULL, 'frontend',   'experienced',  8),
  ( 9, 'native CSS',                     NULL, 'frontend',   'experienced',  9),
  (10, 'Tailwind CSS',                   NULL, 'frontend',   'experienced', 10),
  (11, 'Mobile-First Responsive Design', NULL, 'frontend',   'experienced', 11),
  -- backend
  (12, 'FastAPI',                        NULL, 'backend',    'experienced', 12),
  (13, 'API Design',                     NULL, 'backend',    'experienced', 13),
  (14, 'External API Integration',       NULL, 'backend',    'intermediate',14),
  (15, 'LLM Integration (OpenAI)',       NULL, 'backend',    'intermediate',15),
  (16, 'SQL / SQLite',                   NULL, 'backend',    'intermediate',16),
  -- tools (incl. infrastructure)
  (17, 'Linux / Arch',                   NULL, 'tools',      'experienced', 17),
  (18, 'Docker',                         NULL, 'tools',      'intermediate',18),
  (19, 'Nginx',                          NULL, 'tools',      'intermediate',19),
  (20, 'CI/CD (GitHub Actions, GitLab CI)', NULL, 'tools',   'intermediate',20),
  (21, 'Git',                            NULL, 'tools',      'experienced', 21),
  (22, 'Neovim',                         NULL, 'tools',      'experienced', 22),
  (23, 'VS Code',                        NULL, 'tools',      'experienced', 23),
  (24, 'Claude Code',                    NULL, 'tools',      'experienced', 24);

-- ---------- PROJECT <-> SKILL ----------
INSERT INTO project_skill (project_id, skill_id) VALUES
  -- 1: Kether Internal AI App
  (1, 2), (1, 6), (1, 9), (1, 12), (1, 13), (1, 15), (1, 18), (1, 19),
  -- 2: AI Agent Pipeline
  (2, 1), (2, 12), (2, 13), (2, 15), (2, 18),
  -- 3: Adplorer
  (3, 1), (3, 12), (3, 13), (3, 14), (3, 15),
  -- 4: Rugby Bundesliga
  (4, 1), (4, 2), (4, 6), (4, 9), (4, 10), (4, 11), (4, 12), (4, 13), (4, 14),
  -- 5: Portfolio Page
  (5, 2), (5, 16);

-- ---------- PROFILE <-> PROJECT (curated order for the fullstack-ai profile) ----------
INSERT INTO profile_project (profile_id, project_id, sort_order) VALUES
  (1, 1, 1),   -- Kether Internal AI App
  (1, 2, 2),   -- AI Agent Pipeline
  (1, 3, 3),   -- Adplorer
  (1, 4, 4),   -- Rugby Bundesliga
  (1, 5, 5);   -- Portfolio Page

-- ---------- PROFILE <-> SKILL (which skills show on this profile, ordered) ----------
INSERT INTO profile_skill (profile_id, skill_id, sort_order)
  SELECT 1, id, sort_order FROM skill;

-- ========== PROFILE 2: consultant (second mode — tests the multi-profile mechanism) ==========
-- Consulting framing: client-facing, scope-and-build, communication.
-- DRAFT wording (short_summary / bio_text) — iterate later; quote reuses the approved line.
INSERT INTO profile (id, person_id, slug, jobrole, short_summary, quote, bio_text, cv_url) VALUES
  (2, 1, 'consultant', 'Software Consultant · Full-Stack Engineering',
   'Full-stack engineer who works close to the client — clarifying requirements, scoping the right solution, and building and delivering it into production.',
   'What I enjoy most is getting to the bottom of a technical problem and then making it clear to the people who need to understand it.',
   'Full-stack engineer with a consulting mindset: I clarify requirements with clients, scope the right solution, and build and ship it into production. As co-founder of Kether OS I delivered B2B software and AI projects end to end, from the first client conversation to release, and I like translating complex technical topics so everyone on the project stays aligned.',
   NULL);

-- curated project order for the consultant profile (client-facing / delivery first)
INSERT INTO profile_project (profile_id, project_id, sort_order) VALUES
  (2, 3, 1),   -- Adplorer (PM & client contact, requirements -> delivery)
  (2, 1, 2),   -- Kether Internal AI App (architecture + delivery)
  (2, 4, 3),   -- Rugby Bundesliga (stakeholder coordination, end to end)
  (2, 2, 4),   -- AI Agent Pipeline
  (2, 5, 5);   -- Portfolio Page

-- curated skills for the consultant profile: professional stack only
-- (drops C, LaTeX, Neovim, VS Code -> demonstrates that the profile really filters skills)
INSERT INTO profile_skill (profile_id, skill_id, sort_order)
  SELECT 2, id, sort_order FROM skill WHERE id NOT IN (3, 5, 22, 23);

COMMIT;
