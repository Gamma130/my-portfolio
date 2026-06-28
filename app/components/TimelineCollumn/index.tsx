import type { EntryData } from "@/lib/db/queries";
import TimelineColumn from "./TimelineColumn";
import styles from "./Timeline.module.css";

export default function Background({
  experience,
  education,
}: {
  experience: EntryData[];
  education: EntryData[];
}) {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/experience</span>
      </div>

      <div className={styles.grid}>
        {/* experience first in DOM → left on desktop, top on mobile */}
        <TimelineColumn heading="work" entries={experience} />
        <TimelineColumn heading="education" entries={education} />
      </div>
    </section>
  );
}
