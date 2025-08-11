import React, { useState } from "react";
import { Sun, Moon, Menu } from "lucide-react";

const Navbar = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 dark:bg-blue-900 text-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold">📝 SmartTask</div>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <button className="hover:underline">Tasks</button>
        <button className="hover:underline">Settings</button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Mobile icons */}
      <div className="md:hidden flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          className="p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 dark:bg-blue-900 text-white flex flex-col items-start px-4 py-2 space-y-2 md:hidden z-50">
          <button className="w-full text-left hover:underline">Tasks</button>
          <button className="w-full text-left hover:underline">Settings</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
