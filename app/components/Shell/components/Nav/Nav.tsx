"use client";

import { useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "experience", href: "#experience" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* desktop links */}
      <nav className={styles.nav}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a href="/Nitschke_Marvin_CV.pdf" download className={styles.cvButton}>
          cv ↓
        </a>
      </nav>

      {/* phone menu button */}
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="menu"
        aria-expanded={menuOpen}
      >
        <span className={styles.accent}>:</span>
        {menuOpen ? "close" : "menu"}
      </button>

      {/* phone dropdown */}
      {menuOpen && (
        <>
          <div className={styles.scrim} onClick={() => setMenuOpen(false)} />
          <div className={styles.dropdown}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={styles.dropLink}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.accent}>~/</span>
                {l.label}
              </a>
            ))}
            <a
              href="/Nitschke_Marvin_CV.pdf"
              download
              className={styles.dropLink}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.accent}>~/</span>cv ↓
            </a>
          </div>
        </>
      )}
    </>
  );
}
