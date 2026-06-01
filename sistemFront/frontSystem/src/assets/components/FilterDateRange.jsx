// components/filters/FilterDateRange.jsx
import { CalendarDays, ArrowRight } from "lucide-react";

/**
 * FilterDateRange — rango de fechas desde/hasta
 *
 * Props:
 * - label: string       → etiqueta superior (opcional)
 * - desde: string       → valor "YYYY-MM-DD" controlado
 * - hasta: string       → valor "YYYY-MM-DD" controlado
 * - onDesdeChange: fn   → (value: string) => void
 * - onHastaChange: fn   → (value: string) => void
 */
export function FilterDateRange({ label, desde, hasta, onDesdeChange, onHastaChange }) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-xs font-medium text-gray-500">{label}</label>
            )}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <CalendarDays
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="date"
                        value={desde}
                        onChange={(e) => onDesdeChange(e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-1 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white"
                    />
                </div>

                <ArrowRight size={14} className="text-gray-300 shrink-0" />

                <div className="relative">
                    <CalendarDays
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="date"
                        value={hasta}
                        min={desde}
                        onChange={(e) => onHastaChange(e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-1 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition bg-white"
                    />
                </div>
            </div>
        </div>
    );
}