import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import {
  getProducts,
} from "./api";

import {
  getCache,
  saveCache,
} from "../utils/cache";

vi.mock("../utils/cache", () => ({
  getCache: vi.fn(),
  saveCache: vi.fn(),
}));

describe("getProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  test("devuelve los productos desde caché sin llamar a la API", async () => {
    const cachedProducts = [
      {
        id: "1",
        brand: "Acer",
        model: "Iconia",
      },
    ];

    getCache.mockReturnValue(cachedProducts);

    const result = await getProducts();

    expect(result).toEqual(cachedProducts);

    expect(fetch).not.toHaveBeenCalled();
  });

  test("obtiene productos desde la API cuando no hay caché", async () => {
    const products = [
      {
        id: "1",
        brand: "Acer",
        model: "Iconia",
      },
    ];

    getCache.mockReturnValue(null);

    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(products),
    });

    const result = await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(result).toEqual(products);

    expect(saveCache).toHaveBeenCalledWith(
      "products",
      products
    );
  });

  test("lanza un error cuando la API responde con error HTTP", async () => {
    getCache.mockReturnValue(null);

    fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(
      getProducts()
    ).rejects.toThrow(
      "Error al obtener los productos"
    );
  });
});