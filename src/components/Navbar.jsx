"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // icons

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="Shajid Royal College of Nursing and Midwifery"
          width={314}
          height={89}
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

      {/* Action Buttons */}
      <div className={styles.actions}>
        <a href="/sign-in" className={styles.loginBtn}>
          <FaSignInAlt className={styles.icon} /> Sign In
        </a>
        <a href="/create-account" className={styles.createAccountBtn}>
          <FaUserPlus className={styles.icon} /> Create Account
        </a>
      </div>
    </nav>
  );
}

