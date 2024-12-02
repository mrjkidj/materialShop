import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './contacts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

gsap.registerPlugin(ScrollTrigger);

const Contacts = () => {
    useEffect(() => {
        
        gsap.fromTo(
            `.${styles.contactInformation}`,
            {
                opacity: 0,
                y: -50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: `.${styles.contactInformation}`,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );

        const phoneNumbers = document.querySelectorAll(`.${styles.phoneNumbers} p`);
        phoneNumbers.forEach((el, index) => {
            gsap.fromTo(
                el,
                { opacity: 0, x: 100 },
                {
                    opacity: 1,
                    x: 0,
                    delay: index * 0.3,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: `.${styles.phoneNumbers}`,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        });



gsap.to(`.${styles.contactIcon} a`, {
    opacity: 1,
    scale: 1.2,
    duration: 1.2,
    ease: 'back.out(1.7)',
    stagger: 0.2,
    scrollTrigger: {
        trigger: `.${styles.contactInformation}`,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
    onComplete: () => {

        document.querySelectorAll(`.${styles.contactIcon} a`).forEach((icon) => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, { scale: 1.3, duration: 0.5 });  
            });
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, { scale: 1, duration: 0.5 });  
            });
        });
    },
});


       
        gsap.fromTo(
            `.${styles.geolocation}`,
            {
                opacity: 0,
                scale: 0.8,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: `.${styles.contactInformation}`,
                    start: 'top 40%',
                    end: 'top 10%',
                    scrub: true,
                },
            }
        );
    }, []);

    return (
        <div className={styles.Contacts}>
            <h1 className={styles.contactInformation}>Contact Information</h1>
            <div className={styles.contactDetails}>
                <div className={styles.contactInfoContainer}>
                    <div className={styles.phoneNumbers}>
                        <h3 className={styles.titleContact}>Phone:</h3>
                        <p>+996777567</p>
                        <p>+996508899</p>
                        <p>+996500527</p>
                    </div>
                    <div>
                        <h3 className={styles.titleContact}>Email:</h3>
                        <p>info@youremail.com</p>
                    </div>
                    <div>
                        <h3 className={styles.titleContact}>Address:</h3>
                        <p>Osh City, Lenin Street 323, Kyrgyzstan</p>
                    </div>
                    <div>
                        <h3 className={styles.titleContact}>Schedule:</h3>
                        <p>Пн-Пт: 9:00-18:00</p>
                    </div>
                    <div className={styles.contactIcon}>
                        <a href="">
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faTelegram} />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                </div>
                <div>
                    <iframe
                        className={styles.geolocation}
                        src="https://www.google.com/maps/embed?pb=..."
                        width="800px"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
