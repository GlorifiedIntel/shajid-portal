"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className={styles.navbar}>
      {/* Logo Image */}
      <div className={styles.logo}>
        <Image
          src="/logo.png"  // <-- replace with your actual logo file path
          alt="Shajid Royal College of Nursing and Midwifery"
          width={160}
          height={40}
          priority
        />
      </div>

      {/* Navigation Links */}
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

      {/* Apply Now Button */}
      <a href="/apply" className={styles.applyBtn}>Apply Now</a>
    </nav>
  );
}