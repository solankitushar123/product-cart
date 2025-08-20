import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch.jsx";

export default function AdminPanel({ data, setData }) {
  const [editing, setEditing] = useState(null);

  if (!data || !data.categories) {
    return <div>Loading data...</div>;
  }

  const toggleAvailability = (section, id) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item._id === id ? { ...item, isAvailable: !item.isAvailable } : item
      ),
    }));
  };

  const openEdit = (section, item) => setEditing({ section, item });
  const closeEdit = () => setEditing(null);

  const saveEdit = (section, updatedItem) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    }));
    closeEdit();
  };

  const getSubCategories = (catId) =>
    data.subCategories.filter((sc) => sc.category._id === catId);

  const getProducts = (subCatId) =>
    data.products.filter((p) => p.subCategory._id === subCatId);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {data.categories.map((cat) => (
        <section key={cat._id} className="mb-8 p-4 bg-gray-50 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{cat.name}</h2>
            <div className="flex space-x-4">
              <ToggleSwitch
                isOn={cat.isAvailable}
                onToggle={() => toggleAvailability("categories", cat._id)}
              />
              <button
                onClick={() => openEdit("categories", cat)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>

          {cat.isAvailable &&
            getSubCategories(cat._id).map((subcat) => (
              <div
                key={subcat._id}
                className="ml-6 mb-6 border-l-4 border-gray-300 pl-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{subcat.name}</h3>
                  <div className="flex space-x-4">
                    <ToggleSwitch
                      isOn={subcat.isAvailable}
                      onToggle={() =>
                        toggleAvailability("subCategories", subcat._id)
                      }
                    />
                    <button
                      onClick={() => openEdit("subCategories", subcat)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {subcat.isAvailable && (
                  <ul className="ml-6 space-y-2">
                    {getProducts(subcat._id).map((prod) => (
                      <li
                        key={prod._id}
                        className={`p-3 border rounded flex justify-between items-center ${
                          prod.isAvailable
                            ? "bg-green-50 border-green-400 text-green-900"
                            : "bg-red-100 border-red-400 text-red-900"
                        }`}
                      >
                        <span>{prod.name}</span>
                        <div className="flex space-x-3">
                          <ToggleSwitch
                            isOn={prod.isAvailable}
                            onToggle={() =>
                              toggleAvailability("products", prod._id)
                            }
                          />
                          <button
                            onClick={() => openEdit("products", prod)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </section>
      ))}

      {editing && (
        <EditForm
          item={editing.item}
          section={editing.section}
          onClose={closeEdit}
          onSave={saveEdit}
        />
      )}
    </div>
  );
}

function EditForm({ item, section, onClose, onSave }) {
  const [name, setName] = React.useState(item.name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-bold mb-4">Edit {section.slice(0, -1)}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          placeholder="Name"
          autoFocus
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(section, { ...item, name })}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
