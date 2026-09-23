import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCache, saveCache } from "./cache";

describe("cache", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("devuelve una caché válida", () => {
    const data = {
      id: "123",
      brand: "Acer",
    };

    saveCache("product", data);

    const result = getCache("product");

    expect(result).toEqual(data);
  });

  test("elimina y devuelve null si la caché está expirada", () => {
    const expiredTimestamp = Date.now() - 2 * 60 * 60 * 1000;

    localStorage.setItem(
      "product",
      JSON.stringify({
        data: {
          id: "123",
          brand: "Acer",
        },
        timestamp: expiredTimestamp,
      })
    );

    const result = getCache("product");

    expect(result).toBeNull();
    expect(localStorage.getItem("product")).toBeNull();
  });

  test("elimina y devuelve null si la caché está corrupta", () => {
    localStorage.setItem("product", "esto-no-es-un-json-valido");

    const result = getCache("product");

    expect(result).toBeNull();
    expect(localStorage.getItem("product")).toBeNull();
  });
});
