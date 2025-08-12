"use client";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h4 className={styles.today}>TODAY</h4>
        <h1 className={styles.title}>IT&apos;S YOUR TURN</h1>
        <div className={styles.textBox}>
          <p>
            Whether you’ve been away from campus for a while or have recently
            been enrolled on campus and need more flexibility, if you have
            completed 27 credits in Provo, the Bachelor of General Studies
            (BGS) program is designed for you. With the BGS program, you can
            finish your BYU degree from anywhere, on your own schedule, thanks
            to BYU Independent Study and other select offerings.
          </p>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/nurse.jpg" 
          alt="Smiling Nurse"
          fill
          className={styles.image}
          priority
        />
      </div>

      
    </section>
  );
}