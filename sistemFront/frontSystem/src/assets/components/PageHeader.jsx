export default function PageHeader({
  title = "Título",
  subtitle = "Descripción",
  children, // Agregado por si necesitas meter botones de acción al lado derecho
}) {
  return (
    <div className="w-full mb-0 shrink-0">
      <div className="
        flex items-center justify-between
        bg-white border border-gray-200
        rounded-xl px-3 py-2
        shadow-sm
      ">
        
        {/* IZQUIERDA: Textos */}
        <div className="flex flex-col gap-0.5">
          <h1 className="
            text-slate-800 text-base font-bold tracking-tight
          ">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-500 text-xs font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* DERECHA: Espacio para botones (Crear, Exportar, etc.) */}
        {children && (
          <div className="flex items-center gap-2">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}