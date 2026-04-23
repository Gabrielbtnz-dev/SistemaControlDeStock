export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  width = "w-full"
}) {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>
      
      {label && (
        <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
      />
    </div>
  );
}