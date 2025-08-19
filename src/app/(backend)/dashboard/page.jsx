"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./DashboardLayout.module.css"; 


export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <p>Checking session...</p>
      </div>
    );
  }

  const studentName = session?.user?.name || "Student";

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {studentName}</h2>
      <p>Select a section from the sidebar to get started.</p>
    </div>
  );
}