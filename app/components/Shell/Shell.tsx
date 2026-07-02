import { ProfileSummary, ProfileData } from "@/lib/db/queries";
import Nav from "./components/Nav/Nav";
import AskButtonNav from "./components/AskButtonNav/AskButtonNav";
import AskButtonFooter from "./components/AskButtonFooter/AskButtonFooter";
import SplitLayout from "./components/SplitLayout/SplitLayout";
import BranchSwitcher from "../BranchSwitcher/BranchSwitcher";
import ActiveSection from "./components/ActiveSection/ActiveSection";
import ScrollPercent from "./components/ScrollStatus/ScrollStatus";
import styles from "./Shell.module.css";

export default function Shell({
  children,
  profile,
  profiles,
}: {
  children: React.ReactNode;
  profile: ProfileData;
  profiles: ProfileSummary[];
}) {
  return (
    <div className={styles.root}>
      {/* top bar */}
      <header className={styles.topbar}>
        <a href="#top">
          <div className={styles.prompt}>
            <span className={styles.dot} />
            marvin@portfolio:~/
          </div>
        </a>
        <div className={styles.navGroup}>
          <Nav />
          <AskButtonNav />
        </div>
      </header>
      <div className={styles.main}>
        <SplitLayout>{children}</SplitLayout>
      </div>
      <footer className={styles.statusbar}>
        <span className={styles.statusMode}>NORMAL</span>
        <BranchSwitcher current={profile.slug} profiles={profiles} />
        <span className={styles.statusFile}>
          <ActiveSection root="[data-scroll-container]" />
        </span>
        <span className={styles.statusSpacer} />
        <AskButtonFooter />
        <span className={styles.statusMeta}>utf-8</span>
        <span className={styles.statusPercent}>
          <ScrollPercent scrollSelector="[data-scroll-container]" />
        </span>
      </footer>
    </div>
  );
}
