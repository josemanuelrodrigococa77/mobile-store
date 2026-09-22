import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import ProductListPage from "./ProductListPage";
import { getProducts } from "../services/api";

vi.mock("../services/api", () => ({
  getProducts: vi.fn(),
}));

describe("ProductListPage", () => {
  const products = [
    {
      id: "1",
      brand: "Acer",
      model: "Iconia Talk S",
      price: "170",
      imgUrl: "acer.jpg",
    },
    {
      id: "2",
      brand: "Samsung",
      model: "Galaxy S10",
      price: "300",
      imgUrl: "samsung.jpg",
    },
    {
      id: "3",
      brand: "Apple",
      model: "iPhone 8",
      price: "400",
      imgUrl: "iphone.jpg",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    getProducts.mockResolvedValue(products);
  });

  test("filtra los productos por marca", async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Iconia Talk S")
    ).toBeInTheDocument();

    const searchInput =
      screen.getByPlaceholderText(
        "Buscar por marca o modelo..."
      );

    fireEvent.change(searchInput, {
      target: {
        value: "Samsung",
      },
    });

    expect(
      screen.getByText("Galaxy S10")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Iconia Talk S")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("iPhone 8")
    ).not.toBeInTheDocument();
  });

  test("filtra los productos por modelo", async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Iconia Talk S")
    ).toBeInTheDocument();

    const searchInput =
      screen.getByPlaceholderText(
        "Buscar por marca o modelo..."
      );

    fireEvent.change(searchInput, {
      target: {
        value: "iPhone",
      },
    });

    expect(
      screen.getByText("iPhone 8")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Galaxy S10")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Iconia Talk S")
    ).not.toBeInTheDocument();
  });
});