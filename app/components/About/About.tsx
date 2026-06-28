import type { ProfileData } from "@/lib/db/queries";
import styles from "./About.module.css";

export default function About({ profile }: { profile: ProfileData }) {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/about</span>
      </div>

      <h2 className={styles.heading}>
        <span className={styles.hash}>#</span> about
      </h2>

      <div className={styles.body}>
        {profile.bio_text?.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {profile.quote && (
        <blockquote className={styles.quote}>{profile.quote}</blockquote>
      )}
    </section>
  );
}
