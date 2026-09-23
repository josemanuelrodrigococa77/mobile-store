import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

function parseCartCount(value) {
  const parsedCount = Number(value);
  return Number.isFinite(parsedCount) && parsedCount >= 0 ? parsedCount : 0;
}

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() =>
    parseCartCount(localStorage.getItem("cartCount"))
  );

  useEffect(() => {
    localStorage.setItem("cartCount", String(cartCount));
  }, [cartCount]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === "cartCount") {
        setCartCount(parseCartCount(event.newValue));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
