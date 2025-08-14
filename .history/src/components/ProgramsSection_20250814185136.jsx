import styles from './ProgramsSection.module.css';

export default function ProgramsSection() {
  const programs = [
    { icon: 'bi-laptop-fill', title: 'Business & Technology'},
    { icon: 'fa-solid fa-brain', title: 'Counseling & Psychology' },
    { icon: 'bi-scale', title: 'Criminal Justice & Legal Studies' },
    { icon: 'bi-heart-pulse-fill', title: 'Healthcare' },
    { icon: 'bi-clipboard2-pulse', title: 'Nursing' },
    { icon: 'bi-capsule', title: 'Pharmacy' },
    { icon: 'bi-bank', title: 'Public Administration' },
    { icon: 'bi-hospital', title: 'Public Health' },
    { icon: 'bi-book-fill', title: 'Theology' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.left}>
          <p className={styles.subheading}>PROGRAMS & CERTIFICATES</p>
          <h2 className={styles.heading}>
            The Right Direction <br /> for a Brighter Future
          </h2>
          <p className={styles.text}>
            At Shajid Royal College of Nursing and Midwifery, every program is carefully 
            designed to prepare aspiring nurses and midwives to serve with skill, compassion, and professionalism. 
            By combining specialized coursework in nursing and midwifery with practical clinical training, 
            we ensure our students gain the knowledge, confidence, and hands-on experience needed to thrive 
            in healthcare settings. Supported by experienced faculty members (credentials and experience may vary by instructor), 
            you’ll receive a well-rounded education that empowers you to excel in your profession while improving the 
            health and well-being of your community.
          </p>
          <button className={styles.button}>Browse All Programs & Certificates</button>
        </div>

        {/* Right Column */}
        <div className={styles.grid}>
          {programs.map((program, idx) => (
            <div
              key={idx}
              className={`${styles.card} ${program.active ? styles.active : ''}`}
            >
              <i className={`bi ${program.icon}`}></i>
              <span>{program.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}