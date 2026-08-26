import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/useCart";

function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  const isProductDetail = location.pathname.startsWith("/product/");

  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">
          Mobile Store
        </Link>

        <nav className="breadcrumbs">
          <Link to="/">Productos</Link>

          {isProductDetail && (
            <>
              <span> / </span>
              <span>Detalle del producto</span>
            </>
          )}
        </nav>
      </div>

      <div className="cart">
        🛒 Carrito: {cartCount}
      </div>
    </header>
  );
}

export default Header;