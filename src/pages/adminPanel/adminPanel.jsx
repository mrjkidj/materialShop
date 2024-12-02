import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./adminPanel.module.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]); 
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  const [imageType, setImageType] = useState("url"); 
  const [selectedFile, setSelectedFile] = useState(null); // Для хранения файла
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [error, setError] = useState(""); // Для отображения ошибок
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.token); // Токен авторизации

  // Заглушка для изображения
  const placeholderImage = "https://via.placeholder.com/150";

  // Загрузка продуктов при первом рендере
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  // Функция для загрузки продуктов
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Ошибка загрузки продуктов. Код статуса:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Загруженные продукты:", data);

      const sanitizedData = data.map((product) => ({
        ...product,
        category:
          typeof product.category === "string"
            ? product.category
            : product.category?.parentRef || "",
        imagesUrl: Array.isArray(product.imagesUrl) && product.imagesUrl.length > 0 ? product.imagesUrl : [],
      }));

      setProducts(sanitizedData);
    } catch (err) {
      console.error("Ошибка при загрузке продуктов:", err);
    }
  };

  // Функция для добавления нового продукта
  const handleAddProduct = async () => {
    setError(""); // Сброс ошибок
    const { title, description, price, category } = newProduct;

    if (!title || !description || !price || !category) {
      setError("Все поля обязательны для заполнения!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("category", JSON.stringify({ name: category }));

    // Обработка изображения
    if (imageType === "file" && selectedFile) {
      formData.append("image", selectedFile);
    } else if (imageType === "url" && newProduct.image) {
      formData.append("imageUrl", newProduct.image); // Отправляем ссылку на сервер
    } else {
      setError("Необходимо указать изображение.");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Ошибка добавления продукта:", errorData);
        setError("Ошибка добавления продукта. Проверьте данные.");
        return;
      }

      console.log("Продукт успешно добавлен.");
      setNewProduct({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
      });
      setSelectedFile(null);
      setShowAddProduct(false);
      fetchProducts();
    } catch (err) {
      console.error("Ошибка сервера при добавлении продукта:", err);
      setError("Ошибка сервера при добавлении продукта.");
    }
  };

  // Функция для удаления продукта
  const handleDeleteProduct = async (productId) => {
    console.log("Удаляем продукт с ID:", productId);
    const deleteUrl = `/api/products/${productId}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Ошибка удаления продукта. Ответ сервера:", errorData);
        setError("Не удалось удалить продукт.");
        return;
      }

      console.log(`Продукт с ID ${productId} успешно удалён.`);
      fetchProducts();
    } catch (err) {
      console.error("Ошибка при удалении продукта:", err);
      setError("Ошибка сервера при удалении продукта.");
    }
  };

  // Функция для редактирования продукта
  const handleEditProduct = async (productId) => {
    const updatedProduct = {
      title: prompt("Введите новое название", ""),
      description: prompt("Введите новое описание", ""),
      price: parseFloat(prompt("Введите новую цену", "")) || 0,
      category: JSON.stringify({ name: prompt("Введите новую категорию", "") }),
      imagesUrl: [prompt("Введите URL картинки", "")],
    };

    console.log("Редактируем продукт с ID:", productId);
    const editUrl = `/api/products/${productId}`;

    try {
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Ошибка редактирования продукта. Ответ сервера:", errorData);
        setError("Не удалось обновить продукт.");
        return;
      }

      console.log(`Продукт с ID ${productId} успешно обновлён.`);
      fetchProducts();
    } catch (err) {
      console.error("Ошибка при редактировании продукта:", err);
      setError("Ошибка сервера при обновлении продукта.");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={() => navigate("/login")}>
        Выйти
      </button>
      <h1 className={styles.adminTitle}>Админ-панель</h1>
      <button
        className={styles.addProductButton}
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        {showAddProduct ? "Скрыть форму" : "Добавить продукт"}
      </button>

      {showAddProduct && (
        <div className={styles.addProductForm}>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Название"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <textarea
            placeholder="Описание"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Цена"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Категория"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <div className={styles.imageUpload}>
            <label>
              <input
                type="radio"
                name="imageType"
                value="url"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
              />
              Использовать URL
            </label>
            <label>
              <input
                type="radio"
                name="imageType"
                value="file"
                checked={imageType === "file"}
                onChange={() => setImageType("file")}
              />
              Загрузить файл
            </label>
          </div>
          {imageType === "url" ? (
            <input
              type="text"
              placeholder="Ссылка на изображение"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          )}
          <button onClick={handleAddProduct}>Добавить</button>
        </div>
      )}

      <div className={styles.productsContainer}>
        {products.map((product) => {
          const category =
            typeof product.category === "string" ? product.category : "";

          const imageUrl =
            Array.isArray(product.imagesUrl) && product.imagesUrl.length > 0
              ? product.imagesUrl[0]
              : placeholderImage;

          return (
            <div key={product._id} className={styles.productCard}>
              <img src={imageUrl} alt={product.title || "Без названия"} />
              <h3>{product.title || "Название отсутствует"}</h3>
              <p>{product.description || "Описание отсутствует"}</p>
              {category && <p>Категория: {category}</p>}
              <p>Цена: {product.price ? `${product.price} ₽` : "Цена не указана"}</p>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Удалить
              </button>
              <button onClick={() => handleEditProduct(product._id)}>
                Редактировать
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
