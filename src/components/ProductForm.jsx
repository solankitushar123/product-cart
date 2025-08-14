import React, { useState, useEffect } from "react";

export default function ProductForm({ addProduct, updateProduct, editData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setPrice(editData.price || "");
      setCategory(editData.category || "");
      setImageUrl(editData.imageUrl || "");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProduct = {
      id: editData ? editData.id : Date.now(),
      name,
      price: Number(price),
      category,
      imageUrl,
    };

    editData ? updateProduct(newProduct) : addProduct(newProduct);

    setName("");
    setPrice("");
    setCategory("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editData ? "Update" : "Add"} Product
        </button>
      </div>
    </form>
  );
}
