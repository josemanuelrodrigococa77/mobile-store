import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="product-image"
      />

      <div className="product-info">
        <h2>{product.brand}</h2>
        <p>{product.model}</p>
        <p className="product-price">
          {product.price ? `${product.price} €` : "Precio no disponible"}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
