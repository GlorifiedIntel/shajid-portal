import styles from "@/styles/hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Welcome to Shajid Royal College of Nursing & Midwifery
      </h1>
      <p className={styles.subtitle}>
        Building competent nurses and midwives for a healthier future.
      </p>
      <a href="/apply" className={styles.cta}>
        Apply Today!
      </a>
    </section>
  );
}