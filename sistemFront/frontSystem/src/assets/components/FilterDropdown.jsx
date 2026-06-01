// components/filters/FilterDropdown.jsx
import { ChevronDown } from "lucide-react";

/**
 * FilterDropdown — select estilizado para filtros
 *
 * Props:
 * - label: string          → etiqueta superior
 * - placeholder: string    → opción por defecto (valor "")
 * - options: string[]      → lista de opciones
 * - value: string          → valor controlado
 * - onChange: fn           → (value: string) => void
 */
export function FilterDropdown({ label, placeholder = "Todos", options = [], value, onChange }) {
    return (
        <div className="flex flex-col gap-1 min-w-[180px]">
            {label && (
                <label className="text-xs font-medium text-gray-500">{label}</label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none text-sm border border-gray-200 rounded-lg px-3 pr-8 py-1 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white cursor-pointer"
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
            </div>
        </div>
    );
}