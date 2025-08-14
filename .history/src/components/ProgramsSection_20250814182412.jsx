import styles from './ProgramsSection.module.css';

export default function ProgramsSection() {
  const programs = [
    { icon: 'bi-laptop-fill', title: 'Business & Technology'},
    { icon: 'bi-brain', title: 'Counseling & Psychology' },
    { icon: 'bi-scale', title: 'Criminal Justice & Legal Studies' },
    { icon: 'bi-heart-pulse', title: 'Healthcare' },
    { icon: 'bi-clipboard2-pulse', title: 'Nursing' },
    { icon: 'bi-capsule', title: 'Pharmacy' },
    { icon: 'bi-bank', title: 'Public Administration' },
    { icon: 'bi-hospital', title: 'Public Health' },
    { icon: 'bi-book', title: 'Theology' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.left}>
          <p className={styles.subheading}>PROGRAMS & DEGREES</p>
          <h2 className={styles.heading}>
            The Right Direction <br /> for a Brighter Future
          </h2>
          <p className={styles.text}>
            Each degree program at South University is designed to assist ambitious
            students to discover their potential by combining relevant coursework
            and applicable experience with a supportive faculty and professional
            environment. (Credentials and experience may vary by instructor.)
            You'll receive a well-rounded education that will prepare you to be
            competitive in your chosen field while contributing to your community.
          </p>
          <button className={styles.button}>Browse All Programs & Degrees</button>
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