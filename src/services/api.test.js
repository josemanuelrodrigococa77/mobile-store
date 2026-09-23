import { beforeEach, describe, expect, test, vi } from "vitest";
import { getProducts, toProduct } from "./api";
import { getCache, saveCache } from "../utils/cache";

vi.mock("../utils/cache", () => ({
  getCache: vi.fn(),
  saveCache: vi.fn(),
}));

describe("toProduct", () => {
  test("normaliza los typos y tipos variables del API", () => {
    const result = toProduct({
      id: "1",
      brand: "Acer",
      model: "Iconia",
      primaryCamera: "13 MP",
      secondaryCmera: ["2 MP"],
      dimentions: "100 x 50 mm",
    });

    expect(result.primaryCamera).toEqual(["13 MP"]);
    expect(result.secondaryCamera).toEqual(["2 MP"]);
    expect(result.dimensions).toBe("100 x 50 mm");
    expect(result.options).toEqual({ colors: [], storages: [] });
  });
});

describe("getProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  test("devuelve los productos normalizados desde caché sin llamar a la API", async () => {
    const cachedProducts = [{ id: "1", brand: "Acer", model: "Iconia" }];
    getCache.mockReturnValue(cachedProducts);

    const result = await getProducts();

    expect(result[0]).toMatchObject({
      id: "1",
      brand: "Acer",
      model: "Iconia",
    });
    expect(result[0].primaryCamera).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  test("obtiene, normaliza y cachea productos cuando no hay caché", async () => {
    const products = [
      {
        id: "1",
        brand: "Acer",
        model: "Iconia",
        secondaryCmera: "2 MP",
      },
    ];

    getCache.mockReturnValue(null);
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(products),
    });

    const result = await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result[0].secondaryCamera).toEqual(["2 MP"]);
    expect(saveCache).toHaveBeenCalledWith("products", result);
  });

  test("lanza un error cuando la API responde con error HTTP", async () => {
    getCache.mockReturnValue(null);
    fetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(getProducts()).rejects.toThrow(
      "Error al obtener los productos"
    );
  });
});
