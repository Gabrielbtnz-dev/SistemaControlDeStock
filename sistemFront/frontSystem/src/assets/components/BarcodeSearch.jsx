import { useMemo, useRef } from "react";

export default function BarcodeSearch({
    label,
  options = [],
  searchKey = "codigoDeBarras",
  value,
  setValue,
  onSelect,
  placeholder = "Escanear o buscar..."
}) {
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!value) return [];

    return options.filter((item) =>
      String(item[searchKey] || "")
        .includes(value)
    );
  }, [value, options, searchKey]);

  const handleSelect = (item) => {
    setValue("");
    onSelect && onSelect(item);

    // mantener foco para escáner
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const match = filtered[0];

      if (match) {
        handleSelect(match);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
        {label && (
            <label className="text-sm font-medium text-gray-600">
            {label}
            </label>
        )}
        <input
        ref={inputRef}
        autoFocus
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border border-gray-300 rounded-lg px-3 py-0.5 w-full"
        />
    </div>
  );
}