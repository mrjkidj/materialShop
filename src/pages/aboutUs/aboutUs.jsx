// import React from 'react';
import styles from './aboutUs.module.css';

const AboutUs = () => {
  return (
    <section className={styles.extendedSection}>

      <h1 className={styles.pageTitle}>About Us</h1>

      <div className={styles.sectionWrapper}>


        <div className={styles.sectionBlock}>
          <h2 className={styles.title}>Our Mission</h2>
          <p className={styles.text}>
            Удовлетворение потребностей в современном строительстве и ремонте: Обеспечение клиентов инновационными материалами и инструментами, которые помогают решать задачи по защите, декорированию и улучшению качества поверхностей.

            Поддержка профессионалов и любителей: Помогать как профессиональным строителям, так и индивидуальным мастерам в достижении идеального результата за счёт доступности необходимых материалов и профессиональных рекомендаций.

            Экологичность и устойчивость: Продвигать использование экологически безопасных и долговечных материалов, способствующих уменьшению воздействия на окружающую среду.
          </p>
          <img src="https://manas-img.s3.eu-central-1.amazonaws.com/wp-content/uploads/20240215225048/5euraoplrsh76352.jpg" alt="" className={styles.photo__aboutUs} />
        </div>


        <div className={styles.sectionBlock}>
          <h2 className={styles.title}>Our Team</h2>
          <div className={styles.teamMembers}>
            <div className={styles.teamMember}>
              <img src="https://st40.stblizko.ru/images/product/272/978/983_big.JPG" alt="Team Member 1" className={styles.teamPhoto} />
              <p className={styles.memberName}>John Doe</p>
              <p className={styles.memberPosition}>CEO</p>
              <p className={styles.memberDescription}>John leads the company with a focus on sustainable growth and quality service.</p>
            </div>
            <div className={styles.teamMember}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LkqWwxZfW0fgy15hAnxx29ZUYgoXpruVNw&s" alt="Team Member 2" className={styles.teamPhoto} />
              <p className={styles.memberName}>Jane Smith</p>
              <p className={styles.memberPosition}>Lead Architect</p>
              <p className={styles.memberDescription}>Jane designs innovative solutions that blend aesthetics and function.</p>
            </div>
            <div className={styles.teamMember}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRe5Eixy9QFTgFiz6C6LoiAH2-ld20gjNCX-mf_513Ty5arwIzWtUEmqh047JgNzXj2JI&usqp=CAU" alt="Team Member 3" className={styles.teamPhoto} />
              <p className={styles.memberName}>Michael Brown</p>
              <p className={styles.memberPosition}>Project Manager</p>
              <p className={styles.memberDescription}>Michael ensures every project is on time and up to our quality standards.</p>
            </div>
          </div>
        </div>


        <div className={styles.sectionBlock}>
          <h2 className={styles.title}>Our Philosophy</h2>
          <p className={styles.text}>
            At the heart of our company lies a commitment to quality, sustainability, and customer satisfaction. We believe that building strong, lasting relationships with our clients is essential to achieving our vision of excellence. Every product we offer and every service we provide is designed to meet the unique needs of our customers, ensuring they have access to the best materials and the latest innovations in the industry.
          </p>
        </div>


        <div className={styles.sectionBlock}>
          <h2 className={styles.title}>Our Strategic Goals</h2>
          <ul className={styles.goalsList}>
            <li>Expand our partnerships with industry leaders globally</li>
            <li>Invest in sustainable and eco-friendly solutions</li>
            <li>Enhance customer experience through digital transformation</li>
            <li>Support local communities through responsible business practices</li>
            <li>Continuously improve our product and service quality</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
