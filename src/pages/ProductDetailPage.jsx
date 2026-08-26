import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, addToCart } from "../services/api";
import { useCart } from "../context/useCart";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCartCount } = useCart();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);

        setProduct(data);

        if (data.options?.colors?.length > 0) {
          setSelectedColor(data.options.colors[0].code);
        }

        if (data.options?.storages?.length > 0) {
          setSelectedStorage(data.options.storages[0].code);
        }
      } catch (error) {
        console.error(error);
        setError("No se ha podido cargar el producto");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      setAdding(true);

      const data = await addToCart(
        product.id,
        selectedColor,
        selectedStorage
      );

      console.log("Respuesta carrito:", data);

      setCartCount((previousCount) => previousCount + data.count);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <main className="product-detail-page">
      <Link to="/" className="back-link">
        ← Volver a productos
      </Link>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="detail-image"
          />
        </div>

        <div className="product-detail-info">
          <h1>
            {product.brand} {product.model}
          </h1>

          <div className="product-description">
            <p>
              <strong>Precio:</strong>{" "}
              {product.price ? `${product.price} €` : "No disponible"}
            </p>

            <p>
              <strong>CPU:</strong> {product.cpu}
            </p>

            <p>
              <strong>RAM:</strong> {product.ram}
            </p>

            <p>
              <strong>Sistema operativo:</strong> {product.os}
            </p>

            <p>
              <strong>Resolución:</strong> {product.displayResolution}
            </p>

            <p>
              <strong>Tamaño de pantalla:</strong> {product.displaySize}
            </p>

            <p>
              <strong>Batería:</strong> {product.battery}
            </p>

            <p>
              <strong>Cámara principal:</strong>{" "}
                {Array.isArray(product.primaryCamera)
                ? product.primaryCamera.join(", ")
                : product.primaryCamera || "No disponible"}
            </p>

            <p>
              <strong>Cámara secundaria:</strong>{" "}
                {Array.isArray(product.secondaryCmera)
                ? product.secondaryCmera.join(", ")
                : product.secondaryCmera || "No disponible"}
            </p>

            <p>
              <strong>Dimensiones:</strong> {product.dimentions}
            </p>

            <p>
              <strong>Peso:</strong> {product.weight} g
            </p>
          </div>

          <div className="product-actions">
            <div className="selector-group">
              <label htmlFor="storage">Almacenamiento</label>

              <select
                id="storage"
                value={selectedStorage}
                onChange={(event) =>
                  setSelectedStorage(Number(event.target.value))
                }
              >
                {product.options?.storages?.map((storage) => (
                  <option key={storage.code} value={storage.code}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="selector-group">
              <label htmlFor="color">Color</label>

              <select
                id="color"
                value={selectedColor}
                onChange={(event) =>
                  setSelectedColor(Number(event.target.value))
                }
              >
                {product.options?.colors?.map((color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <button
                type="button"
                className="add-button"
                onClick={handleAddToCart}
                disabled={adding}
                >
                {adding ? "Añadiendo..." : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;