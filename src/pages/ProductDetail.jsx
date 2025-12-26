import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { fetchSingleProduct } from "../api/productapi";
import { AuthContext } from "../context/authContext"; // ✅ fixed

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchSingleProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (added && cart.length > 0) {
      navigate("/cart");
    }
  }, [cart, added, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    addToCart(product);
    setAdded(true);
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-red-500">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-contain rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-xl font-semibold mb-4">₹ {product.price}</p>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
