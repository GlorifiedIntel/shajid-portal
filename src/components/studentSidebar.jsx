"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const menuItems = [
  {
    title: "Academics",
    children: [
      { label: "My Program", href: "/dashboard/academics/my-program" },
      { label: "Class Schedule", href: "/dashboard/academics/class-schedule" },
    ],
  },
  {
    title: "My Profile",
    children: [
      { label: "My Information", href: "/dashboard/profile/my-information" },
      { label: "Passport Upload", href: "/dashboard/profile/passport-upload" },
      { label: "Privacy Settings", href: "/dashboard/profile/privacy-settings" },
    ],
  },
  {
    title: "Finances",
    children: [
      { label: "Account Information", href: "/dashboard/finances/account-info" },
      { label: "Pay Tuition", href: "/dashboard/finances/pay-tuition" },
    ],
  },
  {
    title: "Documents",
    children: [
      { label: "Document Center", href: "/dashboard/documents/center" },
      { label: "Transcripts", href: "/dashboard/documents/transcripts" },
      { label: "Result Checker", href: "/dashboard/documents/result-checker" },
    ],
  },
  {
    title: "Resources",
    children: [
      { label: "Student Software", href: "/dashboard/resources/software" },
      { label: "Careers", href: "/dashboard/resources/careers" },
      { label: "Academic Tools", href: "/dashboard/resources/tools" },
      { label: "Student Wellness", href: "/dashboard/resources/wellness" },
      { label: "Community", href: "/dashboard/resources/community" },
    ],
  },
  {
    title: "Support",
    children: [
      { label: "My Success Team", href: "/dashboard/support/success-team" },
      { label: "Help Center", href: "/dashboard/support/help-center" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  // Open the menu of the current active route
  useEffect(() => {
    menuItems.forEach((menu) => {
      if (menu.children.some((child) => pathname.startsWith(child.href))) {
        setOpenMenus((prev) => ({ ...prev, [menu.title]: true }));
      }
    });
  }, [pathname]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {menuItems.map((menu) => (
            <li key={menu.title}>
              <button
                className={`${styles.menuButton} ${
                  openMenus[menu.title] ? styles.open : ""
                }`}
                onClick={() => toggleMenu(menu.title)}
              >
                {menu.title}
              </button>
              {openMenus[menu.title] && (
                <ul className={styles.submenu}>
                  {menu.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`${styles.submenuLink} ${
                          pathname === child.href ? styles.activeLink : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}