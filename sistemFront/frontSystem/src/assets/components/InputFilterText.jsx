function InputFilterText({
  value,
  onChange,
  placeholder = "Buscar...",
  width = "w-50",
  height = "h-[20px]",
  label
}) {

  return (
    <div className="flex flex-col border border-gray-300 bg-gray-50 rounded-md p-1">
        {label && (
            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
                {label}
            </label>
            )
        }
            <input
            className={`border rounded px-3 py-2 ${width} ${height}`}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            />
    </div>
  );
  
}

export default InputFilterText;