"use client";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h4 className={styles.today}>TODAY</h4>
        <h1 className={styles.title}>IT&apos;S YOUR TURN</h1>
        <div className={styles.textBox}>
          <p>
            Whether you’re beginning your journey in healthcare or returning to advance your qualifications, Shajid Royal College of 
            Nursing and Midwifery offers programs designed to fit your life. Our flexible study options, expert faculty, and hands-on clinical 
            experiences prepare you to serve with skill and compassion in hospitals, clinics, and communities. Learn on campus, online, 
            or through a blend of both — and take the next step toward becoming a confident, qualified nurse or midwife.
          </p>
        </div>
      </div>

      <button className={styles.liveChat}>
        💬 Live Chat
      </button>
    </section>
  );
}