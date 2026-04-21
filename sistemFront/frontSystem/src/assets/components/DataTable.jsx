export default function DataTable({ columns, data, rowClassName }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white shadow-md rounded-2xl">
      <table className="min-w-full text-sm text-left">

        {/* HEADER */}
        <thead className="bg-blue-300 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">
          {data.map((row) => (
            <tr
              key={row.id}
              className={`hover:bg-blue-50 ${rowClassName ? rowClassName(row) : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}