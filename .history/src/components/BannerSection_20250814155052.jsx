import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerContent}>
        <h1>Where Your Future Begins</h1>
        <p>
          We Believe. You Belong Here. Discover why Shajid Royal College of Nursing is a place where faith
          meets your calling. Take the first step today.
        </p>
        <div className={styles.bannerButtons}>
          <a href="#visit" className={`${styles.btn} ${styles.btnYellow}`}>
            Schedule My Visit
          </a>
          <a href="#apply" className={`${styles.btn} ${styles.btnOutline}`}>
            Start My Application
          </a>
        </div>
      </div>

      <div className={styles.bannerImage}>
        <img
          src="/hero-image.jpg"
          alt="Students talking on campus"
        />
      </div>
    </section>
  );
}