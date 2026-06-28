import type { EntryData } from "@/lib/db/queries";
import styles from "./Timeline.module.css";

function formatPeriod(from: string | null, until: string | null) {
  if (!from) return "";
  return `${from} – ${until ?? "present"}`;
}

export default function TimelineColumn({
  heading,
  entries,
}: {
  heading: string;
  entries: EntryData[];
}) {
  return (
    <div>
      <div className={styles.headingRow}>
        <span className={styles.hash}>#</span>
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.entries}>
        {entries.map((e) => (
          <div key={e.id} className={styles.entry}>
            <span className={styles.dot} />
            <div className={styles.period}>
              {formatPeriod(e.time_from, e.time_until)}
            </div>
            <div className={styles.role}>{e.role}</div>
            <div className={styles.org}>{e.org}</div>
            {e.description && <p className={styles.desc}>{e.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
