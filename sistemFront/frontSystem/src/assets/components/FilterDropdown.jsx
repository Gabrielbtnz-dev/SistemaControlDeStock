import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

/**
 * FilterDropdown con búsqueda
 *
 * Props:
 * - label: string
 * - placeholder: string
 * - options: string[]
 * - value: string
 * - onChange: fn
 * - width: string       → clases de ancho del contenedor
 * - className: string   → clases adicionales para el contenedor
 */
export function FilterDropdown({
  label,
  placeholder = "Todos",
  options = [],
  value,
  onChange,
  width = "min-w-[180px]",
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    (opt ?? "").toLowerCase().includes((search ?? "").toLowerCase())
  );

  const displayValue =
    open ? search : (value ? value : "");

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    setSearch("");
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1 ${width} min-w-0 relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-xs font-medium text-gray-500">
          {label}
        </label>
      )}

      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setSearch("");
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-1 pr-8 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white"
        />

        <ChevronDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 max-h-48 min-w-max overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {filteredOptions.length === 0 && (
            <li className="px-3 py-1 text-sm text-gray-400">
              Sin resultados
            </li>
          )}

          {filteredOptions.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-3 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                opt === value ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}