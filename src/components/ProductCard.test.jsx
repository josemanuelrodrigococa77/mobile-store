import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const product = {
    id: "123",
    brand: "Acer",
    model: "Iconia Talk S",
    price: "170",
    imgUrl: "https://example.com/mobile.jpg",
  };

  test("muestra los datos del producto", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText("Acer")).toBeInTheDocument();
    expect(screen.getByText("Iconia Talk S")).toBeInTheDocument();
    expect(screen.getByText("170 €")).toBeInTheDocument();
  });

  test("muestra precio no disponible si el producto no tiene precio", () => {
    const productWithoutPrice = {
      id: "456",
      brand: "Acer",
      model: "Liquid Jade 2",
      price: "",
      imgUrl: "https://example.com/mobile.jpg",
    };

    render(
      <MemoryRouter>
        <ProductCard product={productWithoutPrice} />
      </MemoryRouter>
    );

    expect(screen.getByText("Precio no disponible")).toBeInTheDocument();
  });
});
