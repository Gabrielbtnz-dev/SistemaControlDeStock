import { useState } from "react";
import {
  Users,
  Menu as MenuIcon,
  Home,
  ShoppingBag,
  ShoppingCart,
  Landmark,
  BanknoteArrowDown,
  BanknoteArrowUp,
  X,
  Archive,
  BarChart2,
  ChevronDown,
  ShoppingBasket,
  FileChartColumn,
  BaggageClaim,
  Boxes,
  PackageOpen,
  CircleDollarSign,
  MoveRight,
  MoveLeft
  
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// ── Nav structure ─────────────────────────────────────────────
const navConfig = [
  {
    to: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    to: "/pdv",
    icon: ShoppingCart,
    label: "Vender",
  },
    {
    to: "/pdc",
    icon: BaggageClaim,
    label: "Comprar",
  },
  {
    to: "/cuentasCajas",
    icon: Landmark,
    label: "Cuentas Cajas",
  },
  {
    label: "Financiero",
    icon: CircleDollarSign,
    group: true,
    children: [
      { to: "/EgresoFinanciero", icon: ArrowIconRight, label: "Egreso financiero" },
      { to: "/IngresoFinanciero", icon: ArrowIconLeft, label: "Ingreso financiero" },
    ],
  },
  {
    label: "Catastro",
    icon: Archive,
    group: true,
    children: [
      { to: "/product", icon: ShoppingBag, label: "Productos" },
      { to: "/entity", icon: Users, label: "Clientes" },
    ],
  },
  {
    label: "Reportes",
    icon: BarChart2,
    group: true,
    children: [
      {
        to: "/movimientosdecaja",
        label: "Movimientos de caja",
        customIcon: true,
      },
      {
        to: "/VentasResumido",
        label: "Ventas resumido",
        icon: FileChartColumn,
      },
      ,
      {
        to: "/ComprasResumido",
        label: "Compras resumido",
        icon: FileChartColumn,
      },
      {
        to: "/MovimientosDeStock",
        label: "Movimientos de stock",
        icon: Boxes,
      },
      {
        to: "/StockDisponibilidad",
        label: "Stock",
        icon: PackageOpen,
      },
    ],
  }
];

// ── Cash icon ─────────────────────────────────────────────────
function CashIcon() {
  return (
    <div className="flex flex-col items-center justify-center w-5 h-5">
      <BanknoteArrowUp size={13} color="#4ade80" strokeWidth={2.5} />
      <BanknoteArrowDown size={13} color="#f87171" strokeWidth={2.5} />
    </div>
  );
}

function ArrowIconLeft() {
  return (
    <div className="flex flex-col items-center justify-center w-5 h-5">
      <MoveRight color="#4ade80" />
    </div>
  );
}

function ArrowIconRight() {
  return (
    <div className="flex flex-col items-center justify-center w-5 h-5">
      <MoveLeft color="#f87171" />
    </div>
  );
}

// ── Single nav link ───────────────────────────────────────────
function NavLink({ item, open, active, indent = false }) {
  return (
    <Link
      to={item.to}
      title={!open ? item.label : undefined}
      className={`
        group relative flex items-center gap-3 rounded-xl
        transition-all duration-200 ease-out
        ${indent ? "px-3 py-2 ml-2" : "px-3 py-2.5"}
        ${
          active
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      `}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-300 rounded-r-full" />
      )}

      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
        {item.customIcon ? (
          <CashIcon />
        ) : (
          <item.icon size={indent ? 16 : 18} strokeWidth={active ? 2.5 : 1.8} />
        )}
      </span>

      {open && (
        <span
          className={`font-medium whitespace-nowrap overflow-hidden ${indent ? "text-xs" : "text-sm"}`}
          style={{ animation: "slideIn 0.18s ease-out both" }}
        >
          {item.label}
        </span>
      )}

      {/* Tooltip when collapsed */}
      {!open && (
        <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-700 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 shadow-xl z-50">
          {item.label}
        </span>
      )}
    </Link>
  );
}

// ── Group (dropdown) ──────────────────────────────────────────
function NavGroup({ item, open, location }) {
  const hasActiveChild = item.children.some((c) =>
    location.pathname.startsWith(c.to)
  );
  const [expanded, setExpanded] = useState(hasActiveChild);

  const handleToggle = () => {
    if (open) setExpanded((v) => !v);
  };

  return (
    <div>
      {/* Group header */}
      <button
        onClick={handleToggle}
        title={!open ? item.label : undefined}
        className={`
          group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          transition-all duration-200 ease-out
          ${
            hasActiveChild && !expanded
              ? "text-indigo-400 bg-indigo-950/60"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }
        `}
      >
        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
          <item.icon size={18} strokeWidth={1.8} />
        </span>

        {open && (
          <>
            <span
              className="flex-1 text-sm font-medium whitespace-nowrap text-left"
              style={{ animation: "slideIn 0.18s ease-out both" }}
            >
              {item.label}
            </span>
            <ChevronDown
              size={14}
              className={`flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </>
        )}

        {/* Tooltip when collapsed */}
        {!open && (
          <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-700 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 shadow-xl z-50">
            {item.label}
          </span>
        )}
      </button>

      {/* Children */}
      {open && expanded && (
        <div
          className="mt-0.5 flex flex-col gap-0.5 border-l border-slate-700/60 ml-5 pl-1"
          style={{ animation: "expandDown 0.2s ease-out both" }}
        >
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              item={child}
              open={open}
              active={location.pathname.startsWith(child.to)}
              indent
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Menu ─────────────────────────────────────────────────
function Menu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className={`
          relative flex flex-col h-screen
          bg-slate-900 border-r border-slate-800
          transition-all duration-300 ease-in-out
          ${open ? "w-57" : "w-16"}
        `}
      >
        {/* Top bar */}
        <div
          className={`flex items-center h-16 px-3 border-b border-slate-800 ${
            open ? "justify-between" : "justify-center"
          }`}
        >
          {open && (
            <span
              className="font-bold text-white tracking-wide text-sm uppercase"
              style={{ animation: "fadeIn 0.2s ease-out both" }}
            >
              Menú
            </span>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-150"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto overflow-x-hidden">
          {navConfig.map((item) =>
            item.group ? (
              <NavGroup
                key={item.label}
                item={item}
                open={open}
                location={location}
              />
            ) : (
              <NavLink
                key={item.to}
                item={item}
                open={open}
                active={
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to)
                }
              />
            )
          )}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-slate-800">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 text-slate-500 ${
              open ? "" : "justify-center"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            {open && (
              <>
              <span
                className="text-xs font-medium"
                style={{ animation: "fadeIn 0.2s ease-out both" }}
              >
                En línea
              </span>
              <span className="text-xs font-medium">versión 10.0.0</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;