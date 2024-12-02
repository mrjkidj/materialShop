import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import searchIcon from '../../assets/icons/Search.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import logoImage from '../../assets/images/logo_material_store.png'; 

const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <section className={styles.greeting}>
          <img src={logoImage} alt="SQ R3 Logo" className={styles.logoImage} />
          <div className={styles.navContainer}>
            <nav className={styles.navbar}>
              <Link to="/" className={`${styles.nav} ${styles.navButton}`}>Home</Link>
              <Link to="/about" className={`${styles.nav} ${styles.navButton}`}>About Us</Link>
              <Link to="/contacts" className={`${styles.nav} ${styles.navButton}`}>Contacts</Link>
              <Link to="/products" className={`${styles.nav} ${styles.navButton}`}>Furniture</Link>
              <button className={`${styles.navButton} ${styles.orderNowButton}`}>Order Now</button>
            </nav>

            <div className={styles.searchIcon}>
              <img src={searchIcon} alt="Search Icon" />
            </div>
          </div>
        </section>
      </header>

      <section className={styles.backgroundSection}>
        <div className={styles.background__img}>
          <div className={styles.sideContainer}>
            <div className={styles.blur__blockVertical}>
              <div className={styles.social__icons}>
                <div><FontAwesomeIcon icon={faTwitter} /></div>
                <div><FontAwesomeIcon icon={faInstagram} /></div>
                <div><FontAwesomeIcon icon={faFacebook} /></div>
              </div>
            </div>
            <div className={styles.black__block}></div>
          </div>

          <div className={styles.blur__blockGarizont}>
            <h1>Enjoy your life in our luxurious furniture</h1>
            <p>If you are looking for furniture, then you have come to the right place.</p>
            <button>Order Now</button>
          </div>
        </div>

        <div className={styles.footer_stats}>
          <div className={styles.description}>
            <h3 className={styles.text}>Более 20,000 довольных клиентов по всей стране</h3>
            <h3 className={styles.text}>Качественные стройматериалы, проверенные временем</h3>
            <h3 className={styles.text}>Широкий ассортимент товаров для строительства и ремонта</h3>
          </div>
        </div>

      </section>
    </>
  );
}

export default Navbar;
