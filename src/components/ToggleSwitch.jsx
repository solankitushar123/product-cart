import React from "react";

export default function ToggleSwitch({ isOn, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        isOn ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}
