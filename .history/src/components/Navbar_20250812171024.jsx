"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoBold}>Shajid</span> College of Nursing & Midwifery
      </div>

      <ul className={styles.navLinks}>
        <li
          className={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("prospective")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={styles.dropBtn}>
            Prospective Students <span>▼</span>
          </button>
          {openDropdown === "prospective" && (
            <ul className={styles.dropdownMenu}>
              <li>Check My Eligibility</li>
              <li>Prospective Student Info</li>
              <li>Fees & Financial Assistance</li>
              <li>Graduation Requirements</li>
              <li>Apply Now</li>
              <li>Advising & Support</li>
              <li>FAQs</li>
            </ul>
          )}
        </li>

        <li
          className={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("admitted")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={styles.dropBtn}>
            Admitted Students <span>▼</span>
          </button>
          {openDropdown === "admitted" && (
            <ul className={styles.dropdownMenu}>
              <li>Admitted Student Info</li>
              <li>Fees & Financial Assistance</li>
              <li>Advising & Support</li>
              <li>Facebook Group</li>
            </ul>
          )}
        </li>
      </ul>

      <a href="/apply" className={styles.applyBtn}>Apply Now</a>
    </nav>
  );
}