// components/filters/FilterInput.jsx
import { Search, X } from "lucide-react";

/**
 * FilterInput — input de texto para filtros
 *
 * Props:
 * - label: string        → etiqueta superior
 * - placeholder: string  → texto de ayuda
 * - value: string        → valor controlado
 * - onChange: fn         → (value: string) => void
 */
export function FilterInput({ label, placeholder = "Buscar...", value, onChange }) {
    return (
        <div className="flex flex-col gap-1 min-w-[180px]">
            {label && (
                <label className="text-xs font-medium text-gray-500">{label}</label>
            )}
            <div className="relative">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-8 py-1 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white"
                />
                {value && (
                    <button
                        onClick={() => onChange("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}