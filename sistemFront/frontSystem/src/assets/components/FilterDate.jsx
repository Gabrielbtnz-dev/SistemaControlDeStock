import { CalendarDays } from "lucide-react";

/**
 * FilterDate — selector de una fecha
 *
 * Props:
 * - label: string     → etiqueta superior (opcional)
 * - value: string     → valor "YYYY-MM-DD" controlado
 * - onChange: fn      → (value: string) => void
 */
export function FilterDate({ label, value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-xs">
                    {label}
                </label>
            )}

            <div className="relative">
                <CalendarDays
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-1 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white"
                />
            </div>
        </div>
    );
}