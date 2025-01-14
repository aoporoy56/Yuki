import React, { useState, useEffect } from "react";
import { User, Menu as MenuIcon, X } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Menu from "./Components/Menu";
import WhatsNew from "./Components/WhatsNew";
import AboutUs from "./Components/AboutUs";
import img from "/img/yuki_black.png";
import FindUs from "./Components/FindUs";
import TermsConditions from "./Components/TermsConditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import OrderDelivery from "./Components/OrderDelivery";
import CookiePolicy from "./Components/CookiePolicy";
import CopyrightPolicy from "./Components/CopyrightPolicy";
import LandingPage from "./Components/LandingPage";
import AuthForm from "./Components/AuthForm";
import UserProfile from "./Components/UserProfile";

import { auth } from "./firebase";
import { CartProvider } from "./Context/CartContext";
import { ToastProvider } from "./Context/ToastContext";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { path: "/contact", label: "Contact Us" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About Us" },
    { path: "/whats-new", label: "What's New" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm font-[Oswald] text-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={img} alt="Restaurant Logo" className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-gray-600 hover:text-gray-900 ${
                    currentPath === link.path ? "text-black font-semibold" : ""
                  } group`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/delivery"
                className="hidden md:block relative overflow-hidden bg-red-600 text-white px-4 py-2 rounded-md group"
              >
                <span className="absolute inset-0 w-0 bg-red-700 transition-all duration-300 group-hover:w-full group-hover:scale-150"></span>
                <span className="relative">Order Delivery</span>
              </Link>

              <Link
                to={user ? "/profile" : "/auth"}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="h-6 w-6 text-gray-600" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <MenuIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <img src={img} alt="Restaurant Logo" className="h-8 w-auto" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`px-6 py-4 text-lg ${
                  currentPath === link.path
                    ? "bg-gray-50 text-black font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <Link
              to="/delivery"
              className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Order Delivery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const AuthStateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/profile" />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const App = () => {
  return (
    <Router basename="/yuki/">
      <ToastProvider>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <Navigation />
            {/* Main Content */}
            <main className="pt-16">
              <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path="menu/*" element={<Menu />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="find-us" element={<FindUs />} />
                <Route path="whats-new" element={<WhatsNew />} />
                <Route path="terms" element={<TermsConditions />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="delivery" element={<OrderDelivery />} />
                <Route path="cookies" element={<CookiePolicy />} />
                <Route path="copyright" element={<CopyrightPolicy />} />
                <Route
                  path="auth"
                  element={
                    <AuthStateRoute>
                      <AuthForm />
                    </AuthStateRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Footer />
        </CartProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
