import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Available Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
