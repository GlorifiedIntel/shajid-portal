import styles from "./WhyNursingSection.module.css";

export default function WhyNursingSection() {
  return (
    <section className={styles.whySection}>
      <h2 className={styles.heading}>Why Shajid Royal College of Nursing?</h2>
      <div className={styles.grid}>
        
        <div className={styles.item}>
          <i className="bi bi-easel-fill"></i>
          <h3>1,600+ hours of practice learning</h3>
          <p>Our clinical instructors are closely tied to practice settings to offer students the most up-to-date clinical knowledge.</p>
        </div>

        <div className={styles.item}>
          <i className="bi bi-book-fill"></i>
          <h3>Curriculum integrates theory and practice</h3>
          <p>Our co-requisite courses, taken in sequence, bring knowledge and practice together in a highly intentional way.</p>
        </div>

        <div className={styles.item}>
          <i className="bi bi-people-fill"></i>
          <h3>Groups of 8 students in practice settings</h3>
          <p>Develop friendships and your support network with a core group of peers.</p>
        </div>

        <div className={styles.item}>
          <i className="bi bi-lightbulb-fill"></i>
          <h3>Access to faculty members focused on research</h3>
          <p>Faculty and graduate student research directly impacts education, constantly finding new ways to enhance learning.</p>
        </div>

        <div className={styles.item}>
          <i className="bi bi-hand-index-thumb-fill"></i>
          <h3>Hands-on learning through clinical simulation</h3>
          <p>Hands-on learning in healthcare facilities and community settings through clinical simulation and practicums.</p>
        </div>

        <div className={styles.item}>
          <i className="bi bi-buildings-fill"></i>
          <h3>Opportunities to collaborate across campus</h3>
          <p>Collaborate with partners in medicine, social work, and kinesiology for an interdisciplinary experience.</p>
        </div>

      </div>
    </section>
  );
}