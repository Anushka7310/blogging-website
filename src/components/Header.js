import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">
          PrimeBlog
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/favorites" className="text-white hover:underline">
          Favorites
        </Link>
      </nav>
    </header>
  );
}

export default Header;
