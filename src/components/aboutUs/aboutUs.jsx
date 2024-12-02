import styles from './aboutUs.module.css';
import img__aboutUs from '../../assets/images/img__aboutUs.svg'

const AboutUs = () => {
    return (
        <div className={styles.container}>

            <div className={styles.title__aboutUs}>
                <h2>Learn about us</h2>
                <p>Its short title here</p>
            </div>
            <div className={styles.main__aboutUs}>
                <img className={styles.img__aboutUs} src={img__aboutUs} alt="" />
                <div className={styles.character}>
                    <p className={styles.text__aboutUs}>
Наша компания начала свою деятельность в 2010 году и за более чем 14 лет заработала репутацию надежного партнера для своих клиентов. Мы специализируемся на установке, ламинации, монтаже, а также работаем в производственных цехах, включая цех по изготовлению окон. Сегодня в нашей команде трудятся 14 квалифицированных сотрудников, которые являются настоящими профессионалами своего дела.

Каждый этап нашей работы — это внимание к деталям и стремление к высокому качеству. Мы используем современные технологии и проверенные решения, чтобы удовлетворять потребности даже самых требовательных клиентов.

Хотите узнать больше о том, почему нам доверяют сложные и нестандартные задачи?</p>
                    <button className={styles.btn__aboutUs}>More about us</button>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
