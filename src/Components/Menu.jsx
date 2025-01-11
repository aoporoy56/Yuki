/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import menuData from "../menuData.json";
import heroImg from "/img/hero.jpg";
import Hero from "./Hero";
import Footer from "./Footer";
import Menu__Sidebar from "./Menu__Sidebar";
import Menu_MobileMenu from "./Menu__MobileMenu";
import { useCart } from "../Context/CartContext";
import Toast, { useToast } from "../Context/ToastContext";

// MobileMenuButton.jsx

// MenuItem.jsx
const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if inside Link
    setIsAdding(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      addToCart(item, quantity);
      setQuantity(1);
      setIsAdding(false);
      showToast(`${item.name} added to cart!`);
    }, 500);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link
        to={`/menu/item/${encodeURIComponent(item.name)}`}
        className="block"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-2 truncate">
            {item.description}
          </p>
          <p className="text-xl font-semibold text-gray-900 mt-4">
            {item.price}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg bg-gray-50">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity((prev) => Math.max(1, prev - 1));
              }}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuantity((prev) => prev + 1);
              }}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 bg-red-500 text-white py-2 px-4 rounded-lg 
              ${isAdding ? "bg-red-400" : "hover:bg-red-600"} 
              transition-all duration-200 flex items-center justify-center gap-2`}
          >
            {isAdding ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// MenuCategory.jsx
const MenuCategory = ({ category, forwardedRef }) => {
  return (
    <div ref={forwardedRef} className="mb-12">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        {category.category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.items.map((item, idx) => (
          <MenuItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

// MenuList.jsx
const MenuList = () => {
  const sectionRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map((ref) =>
        ref ? ref.offsetTop - 100 : 0
      );
      const scrollPosition = window.scrollY;

      const currentCategory = offsets.findIndex(
        (offset, index) =>
          scrollPosition >= offset &&
          (index === offsets.length - 1 || scrollPosition < offsets[index + 1])
      );
      setActiveCategory(currentCategory);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToCategory = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <Hero img={heroImg} text={"Our Menu"} />
      <div className="flex min-h-screen">
        <Menu__Sidebar
          menuData={menuData}
          activeCategory={activeCategory}
          handleScrollToCategory={handleScrollToCategory}
          isSidebarOpen={isSidebarOpen}
        />

        <Menu_MobileMenu
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-1 lg:ml-64 p-6 bg-gray-50 mt-12 lg:mt-0">
          {menuData.map((category, index) => (
            <MenuCategory
              key={index}
              category={category}
              forwardedRef={(el) => (sectionRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// MenuItemDetails.jsx
const MenuItemDetails = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  const category = menuData.find((cat) =>
    cat.items.some((item) => item.name === decodedName)
  );
  const item = category?.items.find((item) => item.name === decodedName);

  if (!item) {
    return <p className="text-center text-red-500">Item not found!</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-24">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{item.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{item.description}</p>
          <p className="text-2xl font-semibold text-gray-900">{item.price}</p>
          <Link
            to="/menu"
            className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

// Menu.jsx (Main component)
const Menu = () => {
  return (
    <Routes>
      <Route path="/" element={<MenuList />} />
      <Route path="/item/:name" element={<MenuItemDetails />} />
    </Routes>
  );
};

export default Menu;
