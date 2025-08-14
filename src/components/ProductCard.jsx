import React from "react";

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1 font-medium">₹{product.price}</p>
        {product.category && (
          <span className="mt-2 inline-block px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            {product.category}
          </span>
        )}
        {onEdit && (
          <div className="mt-4">
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition w-full"
            >
              ✏️ Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
