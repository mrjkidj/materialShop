import styles from './review.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Review = ({ services }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <div className={styles.container}>
            <div className={styles.review__title}>
                <h2>Что говорят клиенты о нас</h2>
                <p>Это давно устоявшийся факт, что читатель отвлечется на наш сервис.</p>
            </div>
        
            <div className={styles.container__card}>
                {services.slice(currentIndex, currentIndex + 3).map((review, index) => (
                    <div key={index} className={styles.review}>
                        <img src={review.imageUrl} alt={review.name} />
                        <div>
                            <h2>{review.name}</h2>
                            <h6>{review.date}</h6>
                            <p>{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevReview} disabled={currentIndex === 0}>←</button>
            <button onClick={nextReview} disabled={currentIndex >= services.length - 3}>→</button>
        </div>
    );
};

Review.propTypes = {
    services: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Review;
