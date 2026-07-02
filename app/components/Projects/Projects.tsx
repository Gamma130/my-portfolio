"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectData } from "@/lib/db/queries";
import styles from "./Projects.module.css";

const PAGE = 3;

function ProjectList({
  projects,
  profileSlug,
}: {
  projects: ProjectData[];
  profileSlug: string;
}) {
  const [shown, setShown] = useState(PAGE);
  const visible = projects.slice(0, shown);
  const remaining = projects.length - shown;

  return (
    <>
      <div className={styles.list}>
        {visible.map((p) => (
          <article key={p.id} className={styles.card}>
            <Link
              href={`/${profileSlug}/projects/${p.slug}`}
              className={styles.cardLink}
              aria-label={p.title}
            />

            <h3 className={styles.cardTitle}>{p.title}</h3>
            {p.summary && <div className={styles.cardTag}>{p.summary}</div>}
            {p.description && (
              <p className={styles.cardDesc}>{p.description}</p>
            )}

            <div className={styles.tags}>
              {p.skills.map((s) => (
                <span key={s} className={styles.tag}>
                  {s}
                </span>
              ))}
            </div>

            <div className={styles.links}>
              {p.repo_url ? (
                <a href={p.repo_url} className={styles.link}>
                  [repo]
                </a>
              ) : (
                <span className={styles.noRepo}>// not public</span>
              )}
              {p.demo_url && (
                <a href={p.demo_url} className={styles.link}>
                  [demo]
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setShown((s) => s + PAGE)}
          className={styles.more}
        >
          <span className={styles.moreTag}>--More--</span>
          <span className={styles.moreHint}>
            {remaining} more · press to load
          </span>
        </button>
      )}
    </>
  );
}

export default function Projects({
  projects,
  profileSlug,
}: {
  projects: ProjectData[];
  profileSlug: string;
}) {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/projects</span>
      </div>
      <ProjectList projects={projects} profileSlug={profileSlug} />
    </section>
  );
}
