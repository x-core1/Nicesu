import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/nicesu-logo.svg";
import { useCart } from "../Context/CartContext";


interface NavbarProps {
  onSearch: (value: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [search, setSearch] = useState("");
  const { cart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <nav className="bg-slate-900 text-white px-20 py-8 flex items-center justify-between shadow-2xl sticky top-0 z-50">

      <div className="flex items-center gap-5">
        <img
          src={logo}
          alt="Logo"
          className="h-25 w-auto object-contain"
        />
        <h1 className="text-3xl font-bold tracking-wide">
        </h1>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="bg-transparent border border-slate-500 text-white placeholder-gray-400 px-4 py-2 rounded-xl outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="ml-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl transition text-lg font-medium"
        >
          Search
        </button>
      </form>

      <div className="flex gap-12 text-xl font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 border-b-2 border-blue-400 pb-1"
              : "hover:text-blue-400 transition"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-blue-400 border-b-2 border-blue-400 pb-1"
              : "hover:text-blue-400 transition"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className="relative hover:text-blue-400 transition text-xl"
        >
          <i className="bi bi-cart text-3xl"></i>

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </NavLink>


        <NavLink
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
        >
          Login
        </NavLink>

      </div>
    </nav>
  );
};

export default Navbar;
