import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext); // clearCart included
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");

    // Clear cart on logout
    clearCart();

    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:underline">
          MyApp
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {/* Show Cart only if user is logged in */}
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:underline"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <span>Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-600 px-2 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
