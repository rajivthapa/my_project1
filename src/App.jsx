import Navbar from "./components/Navbar";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/productdetail";
import Cart from "./pages/Cart";
import PaymentComplete from "./pages/PaymentComplete";
// import HomePage from "./pages/Homepage";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
