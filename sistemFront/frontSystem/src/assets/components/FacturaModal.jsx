import { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import FacturaCard from "./FacturaCard";

export default function FacturaModal({ open, onClose, factura, cargando, error }) {
  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-white border border-stone-200 rounded-full p-1.5 shadow-sm hover:bg-stone-50 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        <div className="w-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-stone-400" style={{ scrollbarWidth: "thin", scrollbarColor: "#d6d3d1 transparent" }}>
          {cargando && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-12 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
              <p className="text-sm text-stone-400">Cargando detalle...</p>
            </div>
          )}

          {!cargando && error && (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-12 flex flex-col items-center justify-center gap-2">
              <p className="text-sm font-medium text-stone-700">
                No se pudo cargar el detalle
              </p>
              <p className="text-xs text-stone-400">{error}</p>
            </div>
          )}

          {!cargando && !error && factura && <FacturaCard factura={factura} />}
        </div>
      </div>
    </div>
  );
}