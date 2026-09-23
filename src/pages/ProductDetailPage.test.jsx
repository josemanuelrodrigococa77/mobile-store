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
  waitFor,
} from "@testing-library/react";

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import ProductDetailPage from "./ProductDetailPage";
//import Header from "../components/Header";
import { CartProvider } from "../context/CartContext.jsx";

import {
  addToCart,
  getProductById,
} from "../services/api";

vi.mock("../services/api", () => ({
  getProductById: vi.fn(),
  addToCart: vi.fn(),
}));

describe("ProductDetailPage", () => {
  const product = {
    id: "123",
    brand: "Acer",
    model: "Iconia Talk S",
    price: "170",
    imgUrl: "https://example.com/mobile.jpg",
    cpu: "Octa-core",
    ram: "2 GB",
    os: "Android",
    displayResolution: "1280x720",
    displaySize: "7",
    battery: "3400 mAh",
    primaryCamera: ["13 MP"],
    secondaryCamera: ["2 MP"],
    dimensions: "191 x 99 x 9 mm",
    weight: "260",

    options: {
      colors: [
        {
          code: 1000,
          name: "Black",
        },
        {
          code: 1001,
          name: "White",
        },
      ],

      storages: [
        {
          code: 2000,
          name: "16 GB",
        },
        {
          code: 2001,
          name: "32 GB",
        },
      ],
    },
  };

  function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/product/123"]}>
        <CartProvider>
            <Routes>
            <Route
                path="/product/:id"
                element={<ProductDetailPage />}
            />
            </Routes>
        </CartProvider>
        </MemoryRouter>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    getProductById.mockResolvedValue(product);
  });

  test("muestra el detalle del producto cargado", async () => {
    renderPage();

    expect(
      await screen.findByRole("heading", {
        name: /Acer\s+Iconia Talk S/i,
      })
    ).toBeInTheDocument();

    expect(
      getProductById
    ).toHaveBeenCalledWith("123");
  });

  test("permite seleccionar color y almacenamiento", async () => {
    renderPage();

    await screen.findByRole("heading", {
      name: /Acer\s+Iconia Talk S/i,
    });

    const storage =
      screen.getByLabelText("Almacenamiento");

    const color =
      screen.getByLabelText("Color");

    fireEvent.change(storage, {
      target: {
        value: "2001",
      },
    });

    fireEvent.change(color, {
      target: {
        value: "1001",
      },
    });

    expect(storage.value).toBe("2001");
    expect(color.value).toBe("1001");
  });

  test("envía el producto seleccionado al carrito", async () => {
    addToCart.mockResolvedValue({
      count: 1,
    });

    renderPage();

    await screen.findByRole("heading", {
        name: /Acer\s+Iconia Talk S/i,
    });

    fireEvent.change(
      screen.getByLabelText("Almacenamiento"),
      {
        target: {
          value: "2001",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText("Color"),
      {
        target: {
          value: "1001",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /añadir al carrito/i,
      })
    );

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(
        "123",
        1001,
        2001
      );
    });
  });

  test("actualiza el contador del carrito después de añadir un producto", async () => {
    localStorage.setItem("cartCount", "2");

    addToCart.mockResolvedValue({
      count: 1,
    });

    renderPage();

    await screen.findByRole("heading", {
        name: /Acer\s+Iconia Talk S/i,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /añadir al carrito/i,
      })
    );

    await waitFor(() => {
      expect(
        localStorage.getItem("cartCount")
      ).toBe("3");
    });
  });
});