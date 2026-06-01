import React from 'react';

export const DashboardCard = ({ 
  title = "Ventas", 
  value = "Gs. 0", 
  trend, 
  isPositive = true, 
  footerLeft, 
  footerRight,
  icon: Icon // Recibe un componente de ícono (ej. de Lucide React)
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 p-5 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 group">
      <div className="flex items-center justify-between">
        {/* Contenedor del Ícono animado */}
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 
          ${isPositive 
            ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' 
            : 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
          }`}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>

            {/* Badge de Tendencia Dinámico */}
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium 
              ${isPositive 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
              }`}
            >
              {trend && (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3 h-3"
        >
          {isPositive ? (
            <path
              fillRule="evenodd"
              d="M12.574 4.47a.75.75 0 0 1 .736.025l1.75 1.05a.75.75 0 1 1-.772 1.285l-.838-.503-2.84 4.057a.75.75 0 0 1-1.085.144L7.415 8.845 3.82 12.44a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.019-.038l2.128 1.702 2.422-3.46a.75.75 0 0 1 .245-.214Z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M1.22 8.53a.75.75 0 0 1 1.06 0L6 12.25l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L1.22 9.59a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          )}
        </svg>
        {trend}
      </>
    )}
        </span>
      </div>

      {/* Información Principal */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 tracking-tight">{title}</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
      </div>

      {/* Footer Renderizado Condicionalmente */}
      {(footerLeft || footerRight) && (
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>{footerLeft}</span>
          <span className="font-medium text-gray-500">{footerRight}</span>
        </div>
      )}
    </div>
  );
};