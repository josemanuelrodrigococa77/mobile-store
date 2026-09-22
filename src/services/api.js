import { getCache, saveCache } from "../utils/cache";

const API_URL =
  import.meta.env.VITE_API_URL ??
  "https://itx-frontend-test.onrender.com";

export async function getProducts() {
  const cacheKey = "products";

  const cachedProducts = getCache(cacheKey);

  if (cachedProducts) {
    return cachedProducts;
  }

  const response = await fetch(`${API_URL}/api/product`);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  const data = await response.json();

  saveCache(cacheKey, data);

  return data;
}

export async function getProductById(id) {
  const cacheKey = `product-${id}`;

  const cachedProduct = getCache(cacheKey);

  if (cachedProduct) {
    return cachedProduct;
  }

  const response = await fetch(`${API_URL}/api/product/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el detalle del producto");
  }

  const data = await response.json();

  saveCache(cacheKey, data);

  return data;
}

export async function addToCart(id, colorCode, storageCode) {
  const response = await fetch(`${API_URL}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      colorCode,
      storageCode,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al añadir el producto al carrito");
  }

  return response.json();
}