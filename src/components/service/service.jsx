import styles from './service.module.css';
import carIcon from '../../assets/icons/car_service.svg';
import arrowIcon from '../../assets/icons/arrow__service.svg';
import oneIcon from '../../assets/icons/one_service.svg';
import imgSoftware from '../../assets/images/img_software.svg';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const Service = ({ services }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentReviewRef = useRef([]);

    const nextReview = () => {
        if (currentIndex < services.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevReview = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        // Анимация сдвига по оси Y для центрального отзыва
        gsap.to(currentReviewRef.current[currentIndex], {
            y: -20,  // Сдвиг по оси Y вверх
            duration: 0.4,  // Продолжительность анимации
            ease: "power2.out",
        });

        // Возвращаем остальные карточки в исходное состояние (без анимации)
        currentReviewRef.current.forEach((el, index) => {
            if (index !== currentIndex) {
                gsap.set(el, { y: 0 });  // Убираем сдвиг для остальных
            }
        });

    }, [currentIndex]);

    return (
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.service__title}>
                        <h2>We provide that service</h2>
                        <p>It is a long established fact that a reader will be distracted by the service..</p>
                    </div>

                    <div className={styles.container__service}>
                        <div className={styles.block}>
                            <img src={carIcon} className={styles.icon}></img>
                            <h3>Консультирование по выбору материалов</h3>
                            <p>Консультанты помогают подобрать материалы, которые соответствуют задачам клиента, его бюджету и требованиям. Это снижает риск ошибок и делает процесс более понятным.</p>
                        </div>

                        <div className={styles.block}>
                            <img src={arrowIcon} className={styles.icon}></img>
                            <h3>Обработка и подготовка материалов</h3>
                            <p>Это может включать резку дерева, металла, плитки, смешивание красок и подготовку материалов к использованию. Услуга упрощает процесс работы, особенно для тех, кто не имеет специального оборудования.</p>
                        </div>

                        <div className={styles.block}>
                            <img src={oneIcon} className={styles.icon}></img>
                            <h3>Обеспечение доступности материалов для строительства и ремонта</h3>
                            <p>Магазин предоставляет всё необходимое для строительства, ремонта и улучшения жилищных условий.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.software__title}>
                    <h2>Software</h2>
                    <p>It is a long established fact that a reader will be distracted by the service..</p>
                </div>
                <div className={styles.Software}>
                    <div className={styles.softwareBlock1}>
                        <div className={styles.elementsSoftBlock1}>
                            <h2>Design and buy packaging online</h2>
                            <div>
                                <p>Instant Quotes</p>
                                <p>Design online</p>
                                <p>Instant re-ordering</p>
                            </div>
                            <button>Start designing</button>
                        </div>
                        <img className={styles.imgSoftware1} src={imgSoftware} alt="Software Image" />
                    </div>

                    <div className={styles.softwareBlock2}>
                        <div className={styles.elementsSoftBlock2}>
                            <h2>Source and manage it like a Pro</h2>
                            <div>
                                <p>Collaborate with stakeholders</p>
                                <p>Restock automatically</p>
                                <p>Increase visibility</p>
                            </div>
                            <button>Join Packhelp Pro</button>
                        </div>
                        <img className={styles.imgSoftware1} src={imgSoftware} alt="Software Image" />
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.review__title}>
                    <h2>What say clients about us</h2>
                    <p>It is a long established fact that a reader will be distracted by the service.</p>
                </div>
                <div className={styles.container__card}>
                    {services.slice(currentIndex, currentIndex + 3).map((review, index) => (
                        <div
                            key={index}
                            className={styles.review}
                            ref={(el) => currentReviewRef.current[index] = el}
                        >
                            <img src={review.imageUrl} alt={review.name} />
                            <div>
                                <h2>{review.name}</h2>
                                <h6>{review.date}</h6>
                                <p>{review.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.review__btns}>
                    <button onClick={prevReview} disabled={currentIndex === 0}>←</button>
                    <button onClick={nextReview} disabled={currentIndex >= services.length - 3}>→</button>
                </div>
            </div>
        </>
    );
};

Service.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Service;
