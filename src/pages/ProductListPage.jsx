import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        console.log("Productos recibidos:", data);

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("No se han podido cargar los productos");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
        product.brand.toLowerCase().includes(search) ||
        product.model.toLowerCase().includes(search)
        );
  });

  return (
    <main className="product-list-page">
        <div className="product-list-header">
        <div>
            <h1>Productos</h1>
            <p>{filteredProducts.length} productos</p>
        </div>

        <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
        />
        </div>

        {filteredProducts.length === 0 && (
            <p className="no-results">
                No se han encontrado productos.
            </p>
        )}

        <div className="product-grid">
        {filteredProducts.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
        ))}
        </div>
    </main>
  );

}

export default ProductListPage;