import type { SkillGroup } from "@/lib/db/queries";
import styles from "./Skills.module.css";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.promptLine}>
        <span className={styles.user}>~/skills</span>
      </div>

      <div className={styles.box}>
        {groups.map((g) => (
          <div key={g.group} className={styles.row}>
            <div className={styles.groupName}>{g.group}</div>
            <div className={styles.items}>
              {g.items.map((s) => (
                <span key={s} className={styles.item}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
