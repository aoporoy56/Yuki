const Menu_MobileMenu = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="lg:hidden w-full bg-white border-b px-4 py-2 fixed top-16 z-40">
      <div className="max-w-6xl mx-auto flex justify-center">
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Menu Categories"}
        </button>
      </div>
    </div>
  );
};

export default Menu_MobileMenu;
