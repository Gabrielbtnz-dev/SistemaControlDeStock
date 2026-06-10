import { useState, useRef, useEffect } from "react";

export default function DropDown({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seleccionar...",
  width = "w-full"
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Texto a mostrar en el input: si hay búsqueda activa, mostrar búsqueda;
  // si no, mostrar el label de la opción seleccionada
  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value)
  );

  const displayValue = open ? search : (selectedOption ? selectedOption.label : "");

  const filteredOptions = options.filter((opt) =>
    (opt.label ?? "").toLowerCase().includes((search ?? "").toLowerCase())
  );

  // Cerrar al hacer click afuera
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
    // Simula el evento { target: { value } } para mantener compatibilidad
    onChange({ target: { value: opt.value } });
    setSearch("");
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1 ${width} relative`} ref={containerRef}>
      {label && (
        <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
          {label}
        </label>
      )}

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
        className="border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white"
      />

      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {filteredOptions.length === 0 && (
            <li className="px-3 py-1 text-sm text-gray-400">Sin resultados</li>
          )}

          {filteredOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className={`px-3 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                String(opt.value) === String(value) ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}