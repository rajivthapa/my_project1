import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    // simulate payment success
    clearCart();
    navigate("/payment-complete");
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="mb-4 text-gray-600">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-4">
            <div className="flex gap-4">
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500">₹ {item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right mt-6">
          <h2 className="text-xl font-bold">
            Total: ₹ {totalPrice.toFixed(2)}
          </h2>

          {/* ✅ PAYMENT BUTTON */}
          <button
            onClick={handlePayment}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
