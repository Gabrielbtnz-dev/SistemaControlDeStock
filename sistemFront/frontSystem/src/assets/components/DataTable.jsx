import { useState } from "react";

export default function DataTable({
  columns,
  data = [],
  rowClassName,
  pagination = false,
  itemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado para guardar qué celda específica está expandida (formato: "rowId-colKey")
  const [expandedCell, setExpandedCell] = useState(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = pagination ? data.slice(startIndex, endIndex) : data;

  // Maneja el click en la celda para expandir/colapsar
  const handleCellClick = (rowId, colKey) => {
    const cellId = `${rowId}-${colKey}`;
    setExpandedCell(expandedCell === cellId ? null : cellId);
  };

  return (
    <div className="flex flex-col gap-4 w-full flex-1 min-h-0">
      
      {/* TARJETA BLANCA PRINCIPAL */}
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
        
        {/* SCROLL DE LA TABLA AUTOMÁTICO */}
        <div className="
          overflow-y-auto flex-1 min-h-0
          [&::-webkit-scrollbar]:w-1.5 
          [&::-webkit-scrollbar]:h-1.5 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-300 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
        ">
          <table className="w-full text-xs text-gray-600 table-fixed border-collapse">
            
            {/* HEADER STICKY (FIJO) */}
            <thead className="bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width || "auto" }}
                    className={`px-4 py-3.5 font-bold text-slate-100 uppercase tracking-wider text-[11px] ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* CUERPO DE LA TABLA */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {currentData.length > 0 ? (
                currentData.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-gray-50/80 active:bg-gray-100/50 ${
                      rowClassName ? rowClassName(row) : ""
                    }`}
                  >
                    {columns.map((col) => {
                      const isExpanded = expandedCell === `${row.id}-${col.key}`;
                      
                      return (
                        <td
                          key={col.key}
                          onClick={() => handleCellClick(row.id, col.key)}
                          className={`px-4 py-2.5 text-gray-700 font-medium cursor-pointer select-none vertical-align-middle ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          } ${
                            /* CAMBIO CLAVE:
                              Si está expandido, permite saltos de línea (whitespace-normal) y rompe palabras largas.
                              Si está colapsado, corta el texto elegantemente con puntos suspensivos (...) sin encimarse.
                            */
                            isExpanded 
                              ? "whitespace-normal break-words bg-slate-50/60 shadow-inner" 
                              : "whitespace-nowrap truncate"
                          }`}
                          title={!isExpanded ? "Click para expandir detalle" : "Click para colapsar"}
                        >
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-gray-400 font-normal italic bg-gray-50/30"
                  >
                    No hay registros disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINACIÓN */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center px-2 mt-1 shrink-0">
          <span className="text-xs font-medium text-gray-500">
            Página <span className="text-gray-800 font-semibold">{currentPage}</span> de <span className="text-gray-800 font-semibold">{totalPages}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Anterior
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}