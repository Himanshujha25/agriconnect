import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerRegister from "./pages/BuyerRegister";
import SellerRegister from "./pages/SellerRegister";

// Buyer Pages
import BuyerDashboard from "./pages/Buyer/Dashboard";
import BuyerOrders from "./pages/Buyer/Orders";
import BuyerProducts from "./pages/Buyer/Products";
import BuyerProfile from "./pages/Buyer/Profile";
import BuyerSettings from "./pages/Buyer/Settings";

// Seller Pages
import SellerDashboard from "./pages/Seller/Dashboard";
import SellerAddProduct from "./pages/Seller/AddProduct";
import SellerMyProducts from "./pages/Seller/MyProducts";
import SellerOrders from "./pages/Seller/Orders";
import SellerProfile from "./pages/Seller/Profile";
import SellerSettings from "./pages/Seller/Settings";


export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-[80vh] pt-20"> {/* Added pt-20 for fixed navbar */}
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register-buyer" element={<BuyerRegister />} />
          <Route path="/register-seller" element={<SellerRegister />} />

          {/* Buyer Routes */}
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/products" element={<BuyerProducts />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/settings" element={<BuyerSettings />} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/addproduct" element={<SellerAddProduct />} />
          <Route path="/seller/products" element={<SellerMyProducts />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/settings" element={<SellerSettings />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}