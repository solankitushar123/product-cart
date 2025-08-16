import React from "react";
import ToggleSwitch from "./ToggleSwitch.jsx";

export default function AdminPanel({ products, setProducts }) {
  const handleToggle = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      {Object.keys(grouped).map((cat) => (
        <div key={cat} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">{cat}</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {grouped[cat].map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-md rounded p-4 flex flex-col justify-between"
              >
                {p.images?.length > 0 && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-600">
                  ₹<span className="line-through">{p.mrp}</span>{" "}
                  <span className="text-green-600 font-bold">
                    {p.offerPrice}
                  </span>
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      p.isAvailable ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {p.isAvailable ? "Available" : "Unavailable"}
                  </span>
                  <ToggleSwitch
                    isOn={p.isAvailable}
                    onToggle={() => handleToggle(p._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
