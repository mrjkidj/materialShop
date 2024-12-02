import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productDetails.module.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить продукт');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Ошибка загрузки продукта:', err);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Загрузка информации о продукте...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.productDetails}>
        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <p>Цена: {product.price} ₽</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
