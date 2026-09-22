import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem("cartCount");

    if (!savedCount) {
      return 0;
    }

    const parsedCount = Number(savedCount);

    return Number.isFinite(parsedCount) && parsedCount >= 0
      ? parsedCount
      : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartCount", String(cartCount));
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}