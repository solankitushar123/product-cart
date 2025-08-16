import React from "react";

export default function ProductList({ products }) {
  const availableProducts = products.filter((p) => p.isAvailable);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      {availableProducts.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              {p.images?.length > 0 && (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-600">
                  ₹<span className="line-through">{p.mrp}</span>{" "}
                  <span className="text-green-600 font-bold">
                    {p.offerPrice}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
