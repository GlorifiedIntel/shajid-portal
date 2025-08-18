"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  const studentName = session?.user?.name || "Student";

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {studentName}, to Your Student Portal</h2>
      <p>Select a section from the sidebar to get started.</p>
    </div>
  );
}