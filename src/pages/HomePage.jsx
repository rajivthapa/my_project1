import { useEffect, useState } from "react";
import {
  fetchAllProduct,
  fetchCategoryProduct,
  fetchProductsByCategory,
} from "../api/productapi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const productRes = await fetchAllProduct();
        setAllProducts(productRes.data.products);
        setProducts(productRes.data.products);

        const categoryRes = await fetchCategoryProduct();
        setCategories(categoryRes.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setLoading(true);
    setSearch("");
    setCurrentPage(1);

    try {
      if (category === "all") {
        setAllProducts(allProducts);
        setProducts(allProducts);
      } else {
        const res = await fetchProductsByCategory(category);
        setAllProducts(res.data.products);
        setProducts(res.data.products);
      }
    } catch (err) {
      setError("Failed to load category products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );

    setProducts(filtered);
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="flex justify-center flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleCategoryClick("all")}
          className={`px-4 py-1 rounded border ${
            activeCategory === "all" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          ALL
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`px-4 py-1 rounded border ${
              activeCategory === cat.slug
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold truncate">
                  {product.title}
                </h2>
                <p className="text-gray-600 mt-1">${product.price}</p>

                <button
                  onClick={() => handleViewProduct(product)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
