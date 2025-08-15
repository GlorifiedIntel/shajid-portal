"use client";

import styles from "./serverError.module.css";
import Link from "next/link";

export default function ServerErrorPage({ reset }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>500</h1>
        <h2 className={styles.errorMessage}>Internal Server Error</h2>
        <p className={styles.description}>
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryButton}>
            Try Again
          </button>
          <Link href="/" className={styles.homeButton}>
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
