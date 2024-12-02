
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faBook,
  faCamera,
  faDove,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contact}>
          <h2 className={styles.brand}>SQ R3</h2>
          <p className={styles.contactItem}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} /> +8801760-007083
          </p>
          <p className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> uiuxmdomith@gmail.com
          </p>
          <div className={styles.socialIcons}>
            <FontAwesomeIcon icon={faBook} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faCamera} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faDove} className={styles.socialIcon} />
            <FontAwesomeIcon icon={faLink} className={styles.socialIcon} />
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <h3 className={styles.sectionTitle}>Useful Links</h3>
            <ul className={styles.linkList}>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Furniture</a></li>
            </ul>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>FAQ</h3>
            <ul className={styles.linkList}>
              <li><a href="#">Lorem Ipsum Dolor</a></li>
              <li><a href="#">Lorem Ipsum Dolor</a></li>
              <li><a href="#">Lorem Ipsum Dolor</a></li>
              <li><a href="#">Lorem Ipsum Dolor</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h3 className={styles.sectionTitle}>Newsletter</h3>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your mail"
              className={styles.input}
            />
            <button className={styles.sendButton}>Send</button>
          </div>
          <button className={styles.downloadButton}>Download App</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
