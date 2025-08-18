"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react"; // ✅ Import signOut
import styles from "./DashboardLayout.module.css";

// Import Lucide icons
import {
  BookOpen,
  User,
  Wallet,
  FileText,
  Layers,
  LifeBuoy,
  LogOut, // ✅ Logout icon
} from "lucide-react";

const menuItems = [
  {
    title: "Academics",
    key: "academics",
    icon: BookOpen,
    submenu: [
      { label: "My Program", href: "/dashboard/academics/my-program" },
      { label: "Class Schedule", href: "/dashboard/academics/class-schedule" },
    ],
  },
  {
    title: "My Profile",
    key: "profile",
    icon: User,
    submenu: [
      { label: "My Information", href: "/dashboard/profile/my-information" },
      { label: "Passport Upload", href: "/dashboard/profile/passport-upload" },
      { label: "Privacy Settings", href: "/dashboard/profile/privacy-settings" },
    ],
  },
  {
    title: "Finances",
    key: "finances",
    icon: Wallet,
    submenu: [
      {
        label: "Account Information",
        href: "/dashboard/finances/account-information",
      },
      { label: "Pay Tuition", href: "/dashboard/finances/pay-tuition" },
    ],
  },
  {
    title: "Documents",
    key: "documents",
    icon: FileText,
    submenu: [
      { label: "Document Center", href: "/dashboard/documents/document-center" },
      { label: "Transcripts", href: "/dashboard/documents/transcripts" },
      { label: "Result Checker", href: "/dashboard/documents/result-checker" },
    ],
  },
  {
    title: "Resources",
    key: "resources",
    icon: Layers,
    submenu: [
      { label: "Student Software", href: "/dashboard/resources/student-software" },
      { label: "Careers", href: "/dashboard/resources/careers" },
      { label: "Academic Tools", href: "/dashboard/resources/academic-tools" },
      { label: "Student Wellness", href: "/dashboard/resources/student-wellness" },
      { label: "Community", href: "/dashboard/resources/community" },
    ],
  },
  {
    title: "Support",
    key: "support",
    icon: LifeBuoy,
    submenu: [
      { label: "My Success Team", href: "/dashboard/support/my-success-team" },
      { label: "Help Center", href: "/dashboard/support/help-center" },
    ],
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  // Automatically open the correct menu based on current path
  useEffect(() => {
    const updatedMenus = {};
    menuItems.forEach((menu) => {
      updatedMenus[menu.key] = menu.submenu.some((item) =>
        pathname.startsWith(item.href)
      );
    });
    setOpenMenus(updatedMenus);
  }, [pathname]);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Student Portal</h2>
        <nav>
          <ul className={styles.menu}>
            {menuItems.map((menu) => {
              const Icon = menu.icon;
              return (
                <li key={menu.key}>
                  <button
                    className={`${styles.menuButton} ${
                      openMenus[menu.key] ? styles.activeMenu : ""
                    }`}
                    onClick={() => toggleMenu(menu.key)}
                  >
                    <Icon size={18} className={styles.menuIcon} />
                    {menu.title}
                  </button>
                  {openMenus[menu.key] && (
                    <ul className={styles.submenu}>
                      {menu.submenu.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={
                              pathname === item.href
                                ? styles.activeLink
                                : styles.submenuLink
                            }
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* ✅ Logout button */}
            <li>
              <button
                className={styles.menuButton}
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                <LogOut size={18} className={styles.menuIcon} />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
