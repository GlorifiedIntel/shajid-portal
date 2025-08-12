"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/logo.png" // place in /public folder
          alt="Shajid Royal College of Nursing and Midwifery"
          width={170}
          height={45}
          priority
        />
      </div>

      {/* Menu */}
      <ul className={styles.navLinks}>
        <li
          className={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("prospective")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={styles.dropBtn}>
            Prospective Students <span>▼</span>
          </button>
          <ul
            className={`${styles.dropdownMenu} ${
              openDropdown === "prospective" ? styles.show : ""
            }`}
          >
            <li>Check My Eligibility</li>
            <li>Prospective Student Info</li>
            <li>Fees & Financial Assistance</li>
            <li>Graduation Requirements</li>
            <li>Apply Now</li>
            <li>Advising & Support</li>
            <li>FAQs</li>
          </ul>
        </li>

        <li
          className={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("admitted")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className={styles.dropBtn}>
            Admitted Students <span>▼</span>
          </button>
          <ul
            className={`${styles.dropdownMenu} ${
              openDropdown === "admitted" ? styles.show : ""
            }`}
          >
            <li>Admitted Student Info</li>
            <li>Fees & Financial Assistance</li>
            <li>Advising & Support</li>
            <li>Facebook Group</li>
          </ul>
        </li>
      </ul>

      {/* Apply Now */}
      <a href="/apply" className={styles.applyBtn}>
        Apply Now
      </a>
    </nav>
  );
}