import React from "react";

export default function ProductList({ data }) {
  if (!data || !data.products) {
    return <div>Loading products...</div>;
  }

  // Build fast lookup maps for efficient access
  const categoryMap = new Map(data.categories.map((c) => [c._id, c]));
  const subCategoryMap = new Map(data.subCategories.map((sc) => [sc._id, sc]));

  // Filter products so only those fully available are shown
  const availableProducts = data.products.filter((product) => {
    if (!product.isAvailable) return false;

    const subCat = subCategoryMap.get(product.subCategory?._id);
    if (!subCat || !subCat.isAvailable) return false;

    const cat = categoryMap.get(product.category?._id);
    if (!cat || !cat.isAvailable) return false;

    return true;
  });

  if (availableProducts.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Available Products</h2>
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Available Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {availableProducts.map((prod) => (
          <div
            key={prod._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {prod.images?.length > 0 && (
              <img
                src={prod.images[0]}
                alt={prod.name}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{prod.name}</h3>
              <p className="text-gray-600">
                ₹<span className="line-through">{prod.mrp}</span>{" "}
                <span className="text-green-600 font-bold">
                  {prod.offerPrice}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
