CREATE TABLE person (
  id         INTEGER PRIMARY KEY CHECK (id = 1),
  fullname   TEXT NOT NULL,
  email      TEXT NOT NULL,
  linkedin   TEXT,
  github     TEXT,
  phone      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE profile (
  id          INTEGER PRIMARY KEY,
  person_id   INTEGER NOT NULL REFERENCES person (id) ON DELETE CASCADE,
  slug        TEXT NOT NULL UNIQUE,
  jobrole     TEXT,
  short_summary TEXT,
  quote TEXT,
  bio_text    TEXT,
  cv_url      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE experience (
  id          INTEGER PRIMARY KEY,
  person_id   INTEGER NOT NULL REFERENCES person (id) ON DELETE CASCADE,
  role        TEXT NOT NULL,
  org         TEXT NOT NULL,
  description TEXT,
  time_from   TEXT,
  time_until  TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE education (
  id          INTEGER PRIMARY KEY,
  person_id   INTEGER NOT NULL REFERENCES person (id) ON DELETE CASCADE,
  role        TEXT NOT NULL,
  org         TEXT NOT NULL,
  description TEXT,
  time_from   TEXT,
  time_until  TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE project (
  id          INTEGER PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  person_id   INTEGER NOT NULL REFERENCES person (id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  summary     TEXT,
  description TEXT,
  visibility  TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'described_only')),
  is_highlighted INTEGER NOT NULL DEFAULT 0 CHECK (is_highlighted IN (0, 1)),
  repo_url       TEXT,
  demo_url       TEXT,
  img_url        TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE profile_project (
  profile_id   INTEGER NOT NULL REFERENCES profile (id) ON DELETE CASCADE,
  project_id   INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
  sort_order   INTEGER,
  PRIMARY KEY (profile_id, project_id)
);

CREATE TABLE skill (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  type        TEXT NOT NULL CHECK (type IN ('languages', 'frontend', 'backend', 'tools')),
  experience  TEXT CHECK (experience IN ('beginner', 'intermediate', 'experienced')),
  sort_order  INTEGER
);

CREATE TABLE project_skill (
  project_id  INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
  skill_id    INTEGER NOT NULL REFERENCES skill (id)   ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

CREATE TABLE profile_skill (
  profile_id  INTEGER NOT NULL REFERENCES profile (id) ON DELETE CASCADE,
  skill_id    INTEGER NOT NULL REFERENCES skill (id)   ON DELETE CASCADE,
  sort_order  INTEGER,
  PRIMARY KEY (profile_id, skill_id)
);
