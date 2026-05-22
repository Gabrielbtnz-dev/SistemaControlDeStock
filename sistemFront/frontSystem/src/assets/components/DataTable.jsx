import { useState } from "react";

export default function DataTable({
  columns,
  data,
  rowClassName,
  pagination = false,
  itemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = pagination
    ? data.slice(startIndex, endIndex)
    : data;

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full bg-white shadow-md rounded-2xl overflow-hidden">

        {/* SCROLL TABLA OCUPA TODA LA PANTALLA */}
        <div className="overflow-y-auto h-[calc(100vh-200px)]">

          <table className="w-full text-sm text-left table-auto">

            {/* HEADER STICKY */}
            <thead className="bg-blue-300 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y">
              {currentData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-blue-50 ${
                    rowClassName ? rowClassName(row) : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* PAGINACIÓN */}
      {pagination && (
        <div className="flex justify-center items-center gap-4 mt-2">

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={
              currentPage === totalPages || totalPages === 0
            }
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>

        </div>
      )}

    </div>
  );
}