"use client";

import styles from "./notFound.module.css";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Page Not Found</h2>
        <p className={styles.description}>
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className={styles.homeButton}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}