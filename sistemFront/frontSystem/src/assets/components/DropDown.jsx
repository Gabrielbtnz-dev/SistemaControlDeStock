export default function DropDown({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seleccionar...",
  width = "w-full"
}) {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>

      {label && (
        <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}

      </select>
    </div>
  );
}