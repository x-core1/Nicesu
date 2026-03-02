import { Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <>
      <Navbar onSearch={setSearchTerm} /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products searchTerm={searchTerm} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;