import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <h1 className={styles.logo}>SHAJID ROYAL</h1>
        <div className={styles.logoText}>
          <div>COLLEGE OF NURSING</div>
          
        </div>
      </div>

      <div className={styles.linkSections}>
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Apply</a></li>
            <li><a href="#">Application Deadlines</a></li>
            <li><a href="#">Career Services</a></li>
            <li><a href="#">Dean of Students Office</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Devotionals</a></li>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Employment</a></li>
            <li><a href="#">Guaranteed Scholarship</a></li>
            <li><a href="#">Shajid Royal College Merchandise</a></li>
            <li><a href="#">Student Help Center</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Information</h3>
          <ul>
            <li><a href="#">Certificates & Diplomas</a></li>
            <li><a href="#">Shajid Royal College</a></li>
            <li><a href="#">Admissions</a></li>
            <li><a href="#">Tuition & Discounts</a></li>
            <li><a href="#">Nursing & Midwifery</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Facts and Stats</a></li>
            <li><a href="#">News & Features</a></li>
            <li><a href="#">Marketing Resources</a></li>
            <li><a href="#">Instructors</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Partner Programs</h3>
          <ul>
            <li><a href="#">Microbiology</a></li>
            <li><a href="#">Welfare and Self-Reliance</a></li>
            <li><a href="#">Certifications</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}