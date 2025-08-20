import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel.jsx";
import ProductList from "./components/ProductList.jsx";
import initialData from "./data/unavailableData.js";

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("appData");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-lg">
        <nav className="flex justify-center gap-8 text-lg font-semibold">
          <Link to="/" className="hover:text-yellow-300">
            🛍 User View
          </Link>
          <Link to="/admin" className="hover:text-yellow-300">
            ⚙️ Admin Panel
          </Link>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        <Routes>
          <Route
            path="/admin"
            element={<AdminPanel data={data} setData={setData} />}
          />
          <Route path="/" element={<ProductList data={data} />} />
        </Routes>
      </main>
    </Router>
  );
}
