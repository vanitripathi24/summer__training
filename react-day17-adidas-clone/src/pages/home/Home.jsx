import { useEffect, useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import { getAllProducts } from "../../services/productApi";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const limit = 10;
  useEffect(() => {
  fetchProducts(page);
}, [page]);

const fetchProducts = async (page) => {
  try {
    console.log("Fetching products...");

    const data = await getProducts(page);

    console.log("API Response:", data);

    setProducts(data.products);
    setTotal(data.total);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const skip = (page - 1) * limit;

        const data = await getAllProducts(
          limit,
          skip
        );

        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (loading) {
    return <h1>Loading Products...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const filteredProducts =
    products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="home-page">

      <h1>Adidas Products</h1>

      <input
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <ProductGrid
        products={filteredProducts}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "30px"
        }}
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {page}
        </span>

        <button
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Home;