import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import QuitOnKey from "./QuitOnKey";
import { getProjectBySlug } from "@/lib/db/queries";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  console.log(project);

  if (!project) notFound();

  return (
    <main className={styles.page}>
      <QuitOnKey href="/#projects" />
      <div className={styles.header}>
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>less ~/projects/{project.slug}.md</span>
        <span className={styles.spacer} />
        <Link href="/#projects" className={styles.quit}>
          [q] quit
        </Link>
      </div>

      <div className={styles.body}>
        <article className={styles.inner}>
          <h1 className={styles.title}>
            <span className={styles.hash}># </span>
            {project.title}
          </h1>
          {project.summary && (
            <div className={styles.tag}>{project.summary}</div>
          )}

          <div className={styles.tags}>
            {project.skills.map((s) => (
              <span key={s} className={styles.tag2}>
                {s}
              </span>
            ))}
          </div>

          <div className={styles.links}>
            {project.repo_url ? (
              <a href={project.repo_url} className={styles.link}>
                [repo]
              </a>
            ) : (
              <span className={styles.noRepo}>// not public</span>
            )}
            {project.demo_url && (
              <a href={project.demo_url} className={styles.link}>
                [demo]
              </a>
            )}
          </div>

          {project.body_md ? (
            <div className={styles.prose}>
              <Markdown>{project.body_md}</Markdown>
            </div>
          ) : (
            project.description && (
              <p className={styles.fallback}>{project.description}</p>
            )
          )}

          <div className={styles.footer}>
            <Link href="/#projects" className={styles.footerLink}>
              ← back to projects
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
