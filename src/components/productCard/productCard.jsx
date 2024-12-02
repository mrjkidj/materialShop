import PropTypes from 'prop-types';
import styles from './productCard.module.css';

const ProductCard = ({ title, price, description, imageUrl }) => {
    return (
        <div className={styles.productCard}>
            <img src={imageUrl} alt={title} className={styles.productImage} />
            <h3 className={styles.productName}>{name}</h3> 
            <span className={styles.productPrice}>${price}</span>
            <p className={styles.productDescription}>{description}</p>
        </div>
    );
};


ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
};

export default ProductCard;



