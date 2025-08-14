import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel.jsx";
import ProductList from "./components/ProductList.jsx";
import productsData from "./data/productsData.jsx";

function App() {
  const [products, setProducts] = useState(productsData);

  return (
    <Router>
      <header className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 shadow-md">
        <nav className="flex justify-center gap-10 text-lg font-semibold">
          <Link to="/" className="hover:text-yellow-300">
            🛍 User View
          </Link>
          <Link to="/admin" className="hover:text-yellow-300">
            ⚙️ Admin Panel
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path="/admin"
            element={
              <AdminPanel products={products} setProducts={setProducts} />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
