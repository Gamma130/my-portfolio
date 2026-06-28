import type { ProjectData } from "@/lib/db/queries";
import styles from "./Projects.module.css";

export default function Projects({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/projects</span>
      </div>

      <div className={styles.list}>
        {projects.map((p) => (
          <article key={p.id} className={styles.card}>
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
    </section>
  );
}
