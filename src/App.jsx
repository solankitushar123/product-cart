import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel.jsx";
import ProductList from "./components/ProductList.jsx";
import unavailableData from "./data/unavailableData.js";

export default function App() {
  // Load data from localStorage OR default file
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : unavailableData.products;
  });

  // Persist whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <Router>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg">
        <nav className="flex justify-center gap-8 text-lg font-semibold">
          <Link to="/" className="hover:text-yellow-300">🛍 User View</Link>
          <Link to="/admin" className="hover:text-yellow-300">⚙️ Admin Panel</Link>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
        </Routes>
      </main>
    </Router>
  );
}
