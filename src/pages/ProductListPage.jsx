import { useCallback, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useAsync } from "../hooks/useAsync";
import { getProducts } from "../services/api";

function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const fetchProducts = useCallback(() => getProducts(), []);
  const { data: products = [], loading, error } = useAsync(fetchProducts);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>No se han podido cargar los productos</p>;
  }

  const search = searchTerm.toLowerCase();
  const filteredProducts = (products ?? []).filter((product) =>
    product.brand?.toLowerCase().includes(search) ||
    product.model?.toLowerCase().includes(search)
  );

  return (
    <main className="product-list-page">
      <div className="product-list-header">
        <div>
          <h1>Productos</h1>
          <p>{filteredProducts.length} productos</p>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-results">No se han encontrado productos.</p>
      )}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default ProductListPage;
