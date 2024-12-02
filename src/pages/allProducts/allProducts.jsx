import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './allProducts.module.css';
import ProductCard from '../../components/productCard/productCard';
import { fetchProducts } from '../../redux-toolkit/reducers/products/productsSlice';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const productsStatus = useSelector((state) => state.products.status);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productsStatus, dispatch]);

    useEffect(() => {
        gsap.utils.toArray(`.${styles.productCard}`).forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                delay: 0.1 * index,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }, []);

    if (productsStatus === 'loading') return <p>Загрузка...</p>;
    if (productsStatus === 'failed') return <p>Не удалось загрузить товары.</p>;

    return (
        <div className={styles.container}>
            <div className={styles.title_furniture}>
                <h1 className={styles.h2__title}>Our Furniture</h1>
                <p>It is a long established fact that a reader will be distracted by the service.</p>
            </div>
            <nav className={styles.nav}>
                <div className={styles.product__search}>
                    <input type="text" placeholder="Search a furniture" className={styles.search__input} />
                    <button className={styles.search__button}>
                        <span>?</span>
                    </button>
                </div>

                <div className={styles.product__categories}>
                    <button onClick={() => handleCategoryFilter("")}>Все категории</button>
                    <button onClick={() => handleCategoryFilter("экстерьерные пленки")}>
                        Экстерьерные пленки
                    </button>
                    <button onClick={() => handleCategoryFilter("клеевые материалы")}>
                        Клеевые материалы
                    </button>
                    <button onClick={() => handleCategoryFilter("ретуширующие маркеры")}>
                        Ретуширующие маркеры
                    </button>
                    <button onClick={() => handleCategoryFilter("защитные пленки")}>
                        Защитные пленки
                    </button>
                    <button onClick={() => handleCategoryFilter("самоклеящийся лист")}>
                        Самоклеящийся лист
                    </button>
                    <button onClick={() => handleCategoryFilter("оборудование для ламинации")}>
                        Оборудование для ламинации
                    </button>
                    <button onClick={() => handleCategoryFilter("расходные материалы")}>
                        Расходные материалы
                    </button>
                    <button onClick={() => handleCategoryFilter("самоклеящаяся пленка")}>
                        Самоклеящаяся пленка
                    </button>
                </div>
            </nav>

            <div className={styles.productCardsContainer}>
                {filteredProducts.map((product) => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className={styles.productCardWrapper}
                    >
                        <ProductCard
                            name={product.title}
                            price={product.price}
                            description={product.description}
                            imageUrl={product.imageUrl}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
