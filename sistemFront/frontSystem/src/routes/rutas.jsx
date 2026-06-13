import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../assets/layout/MainLayout";
import ProtectedRoute from "../auth/ProtectedRoute";

// Carga diferida de páginas
const Dashboard = lazy(() => import("../pages/dashboard"));
const Entity = lazy(() => import("../pages/entity"));
const Pdv = lazy(() => import("../pages/pdv"));
const Product = lazy(() => import("../pages/product"));
const CuentasCajas = lazy(() => import("../pages/CuentasCajas"));
const MovimientosDeCajas = lazy(() => import("../pages/MovimientosDeCajas"));
const VentasResumido = lazy(() => import("../pages/VentasResumido"));
const Pdc = lazy(() => import("../pages/Pdc"));
const MovimientosDeStock = lazy(() => import("../pages/MovimientosDeStock"));
const Stock = lazy(() => import("../pages/Stock"));
const ComprasResumido = lazy(() => import("../pages/ComprasResumido"));
const Login = lazy(() => import("../pages/Login"));
const EgresoFinanciero = lazy(() => import("../pages/EgresoFinanciero"));
const IngresoFinanciero = lazy(() => import("../pages/IngresoFInanciero"));
const RegistroFinanciero = lazy(() => import("../pages/RegistrosFinancieros"));

function Rutas() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando módulo...</div>}>
        <Routes>

          {/* REDIRECCIÓN RAÍZ */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PÚBLICA */}
          <Route path="/login" element={<Login />} />

          {/* PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/entity" element={<Entity />} />
              <Route path="/product" element={<Product />} />
              <Route path="/pdv" element={<Pdv />} />
              <Route path="/cuentasCajas" element={<CuentasCajas />} />
              <Route path="/movimientosdecaja" element={<MovimientosDeCajas />} />
              <Route path="/ventasresumido" element={<VentasResumido />} />
              <Route path="/pdc" element={<Pdc />} />
              <Route path="/movimientosdestock" element={<MovimientosDeStock />} />
              <Route path="/stockdisponibilidad" element={<Stock />} />
              <Route path="/comprasresumido" element={<ComprasResumido />} />
              <Route path="/EgresoFinanciero" element={<EgresoFinanciero />} />
              <Route path="/IngresoFinanciero" element={<IngresoFinanciero />} />
              <Route path="/RegistroFinanciero" element={<RegistroFinanciero />} />

            </Route>
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Rutas;