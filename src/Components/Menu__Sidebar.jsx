import React from "react";
import { ChevronRight } from "lucide-react";

const Menu__Sidebar = ({
  menuData,
  activeCategory,
  handleScrollToCategory,
  isSidebarOpen,
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white text-slate-600 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out z-30 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:w-56 lg:w-64 lg:translate-x-0`}
    >
      <div className="flex flex-col h-full pt-24">
        <header className="px-4 py-3 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Categories</h2>
        </header>

        <nav className="flex-1 py-2">
          <ul className="space-y-0.5 px-2">
            {menuData.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => handleScrollToCategory(index)}
                  className={`w-full group flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 
                    ${
                      activeCategory === index
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  <span className="flex-1 text-left">{category.category}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 
                      ${
                        activeCategory === index
                          ? "opacity-100 rotate-90"
                          : "opacity-50 group-hover:opacity-100"
                      }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Menu__Sidebar;
