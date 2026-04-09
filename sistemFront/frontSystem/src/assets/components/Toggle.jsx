import { useState } from "react";

export default function Toggle({
  label,
  value = false,
  onChange,
}) {
  const [checked, setChecked] = useState(value);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      
      {label && (
        <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}