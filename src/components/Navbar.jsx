"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/logo.png" // Place in /public
          alt="Shajid Royal College of Nursing and Midwifery"
          width={314}
          height={89}
          priority
        />
      </div>

      {/* Hamburger Icon for Mobile */}
      <div
        className={styles.hamburger}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu */}
      <ul
        className={`${styles.navLinks} ${
          mobileMenuOpen ? styles.mobileOpen : ""
        }`}
      >
        <li className={styles.dropdown}>
          <button
            className={styles.dropBtn}
            onClick={() => toggleDropdown("prospective")}
          >
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

        <li className={styles.dropdown}>
          <button
            className={styles.dropBtn}
            onClick={() => toggleDropdown("admitted")}
          >
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

        {/* Apply Now in mobile menu */}
        <li className={styles.mobileApply}>
          <a href="/apply" className={styles.applyBtn}>
            Apply Now
          </a>
        </li>
      </ul>

      {/* Apply Now for desktop */}
      <a href="/apply" className={styles.applyBtnDesktop}>
        Apply Now
      </a>
    </nav>
  );
}