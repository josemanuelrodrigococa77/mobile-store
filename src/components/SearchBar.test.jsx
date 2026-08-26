import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("notifica el texto introducido por el usuario", () => {
    const handleSearchChange = vi.fn();

    render(
      <SearchBar
        searchTerm=""
        onSearchChange={handleSearchChange}
      />
    );

    const input = screen.getByPlaceholderText(
      "Buscar por marca o modelo..."
    );

    fireEvent.change(input, {
      target: { value: "Acer" },
    });

    expect(handleSearchChange).toHaveBeenCalledWith("Acer");
  });
});