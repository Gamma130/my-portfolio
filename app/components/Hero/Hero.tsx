import type { ProfileData } from "@/lib/db/queries";
import styles from "./Hero.module.css";

export default function Hero({ profile }: { profile: ProfileData }) {
  const [firstName, ...rest] = profile.fullname.split(" ");
  const lastName = rest.join(" ");
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/</span>
      </div>
      <h1 className={styles.name}>
        <span
          className={styles.line1}
          style={{ "--chars": firstName.length } as React.CSSProperties}
        >
          {firstName}
        </span>
        <span
          className={styles.line2}
          style={
            {
              "--chars": lastName.length,
              "--first-chars": firstName.length,
            } as React.CSSProperties
          }
        >
          {lastName}
        </span>
      </h1>{" "}
      {profile.jobrole && <div className={styles.role}>{profile.jobrole}</div>}
      <p className={styles.tagline}>{profile.short_summary}</p>
      <div className={styles.links}>
        {profile.github && (
          <a href={profile.github} className={styles.link}>
            [github]
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} className={styles.link}>
            [linkedin]
          </a>
        )}
        {profile.cv_url && (
          <a href={profile.cv_url} className={styles.link}>
            [cv.pdf]
          </a>
        )}
        <a href="#projects" className={styles.linkDim}>
          [projects →]
        </a>
      </div>
    </section>
  );
}
