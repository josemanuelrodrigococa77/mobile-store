import { getCache, saveCache } from "../utils/cache";
const API_URL = "https://itx-frontend-test.onrender.com";

export async function getProducts() {
  const cacheKey = "products";

  const cachedProducts = getCache(cacheKey);

  if (cachedProducts) {
    console.log("Productos obtenidos desde caché");

    return cachedProducts;
  }

  console.log("Productos obtenidos desde API");

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
    console.log("Detalle obtenido desde caché");

    return cachedProduct;
  }

  console.log("Detalle obtenido desde API");

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