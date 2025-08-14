import React, { useState } from "react";
import ProductForm from "./ProductForm.jsx";
import ProductCard from "./ProductCard.jsx";

export default function AdminPanel({ products, setProducts }) {
  const [editData, setEditData] = useState(null);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditData(null);
  };

  const handleEdit = (product) => setEditData(product);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel</h2>

      <ProductForm
        addProduct={addProduct}
        updateProduct={updateProduct}
        editData={editData}
      />

      <h3 className="text-lg font-semibold mb-4">Manage Products</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
