import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem("cartCount");

    return savedCount ? Number(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}