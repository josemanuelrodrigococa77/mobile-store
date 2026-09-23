import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAsync } from "../hooks/useAsync";
import { addToCart, getProductById } from "../services/api";

function ProductDetailPage() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [adding, setAdding] = useState(false);
  const { setCartCount } = useCart();

  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const { data: product, loading, error } = useAsync(fetchProduct);

  const effectiveColor =
    product?.options.colors.some((color) => color.code === selectedColor)
      ? selectedColor
      : (product?.options.colors[0]?.code ?? "");

  const effectiveStorage =
    product?.options.storages.some((storage) => storage.code === selectedStorage)
      ? selectedStorage
      : (product?.options.storages[0]?.code ?? "");

  async function handleAddToCart() {
    try {
      setAdding(true);
      await addToCart(product.id, effectiveColor, effectiveStorage);
      setCartCount((previousCount) => previousCount + 1);
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
    return <p>No se ha podido cargar el producto</p>;
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
            <p><strong>CPU:</strong> {product.cpu}</p>
            <p><strong>RAM:</strong> {product.ram}</p>
            <p><strong>Sistema operativo:</strong> {product.os}</p>
            <p><strong>Resolución:</strong> {product.displayResolution}</p>
            <p><strong>Tamaño de pantalla:</strong> {product.displaySize}</p>
            <p><strong>Batería:</strong> {product.battery}</p>
            <p>
              <strong>Cámara principal:</strong>{" "}
              {product.primaryCamera.join(", ") || "No disponible"}
            </p>
            <p>
              <strong>Cámara secundaria:</strong>{" "}
              {product.secondaryCamera.join(", ") || "No disponible"}
            </p>
            <p><strong>Dimensiones:</strong> {product.dimensions}</p>
            <p><strong>Peso:</strong> {product.weight} g</p>
          </div>

          <div className="product-actions">
            <div className="selector-group">
              <label htmlFor="storage">Almacenamiento</label>
              <select
                id="storage"
                value={effectiveStorage}
                onChange={(event) => setSelectedStorage(Number(event.target.value))}
              >
                {product.options.storages.map((storage) => (
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
                value={effectiveColor}
                onChange={(event) => setSelectedColor(Number(event.target.value))}
              >
                {product.options.colors.map((color) => (
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
