import { useEffect, useMemo, useRef, useState } from "react";

export default function DropdownSearch({
  label,
  options = [],
  placeholder = "Buscar...",
  displayKey = "label",
  valueKey = "value",
  onSelect,
  value,
  setValue
}) {
  const [open, setOpen] = useState(false);
    const search = value;
    const setSearch = setValue;
  const containerRef = useRef(null);

  // Filtrar opciones
  const filteredOptions = useMemo(() => {
  if (!search) return options;

  return options.filter((opt) =>
    String(opt[displayKey] || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [search, options]);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSearch(item[displayKey]);
    setOpen(false);
    onSelect && onSelect(item);
  };

  return (
  
  <div className="flex flex-col gap-1 w-full relative" ref={containerRef}>
    {label && (
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>
    )}

    <input
      value={search}
      placeholder={placeholder}
     onChange={(e) => {
  const val = e.target.value;
  setSearch(val);
  setOpen(val.length > 0); // solo abre si hay texto
}}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

    {open && filteredOptions.length > 0 && (
      <div className="absolute top-full left-0 w-full mt-1 border border-gray-200 rounded-lg max-h-60 overflow-auto bg-white shadow-md z-50">
        {filteredOptions.map((opt) => (
          <div
            key={opt[valueKey]}
            onClick={() => handleSelect(opt)}
            className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-100"
          >
            {opt[displayKey]}
          </div>
        ))}
      </div>
    )}
  </div>
);
}