import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Entity from "../pages/entity";
import Pdv from "../pages/pdv";
import MainLayout from "../assets/layout/MainLayout";
import Product from "../pages/product";
import CuentasCajas from "../pages/CuentasCajas";
import MovimientosDeCajas from "../pages/MovimientosDeCajas";
import VentasResumido from "../pages/VentasResumido";
import Pdc from "../pages/Pdc";
import MovimientosDeStock from "../pages/MovimientosDeStock";
import Stock from "../pages/Stock";
import ComprasResumido from "../pages/ComprasResumido";
import Login from "../pages/Login";

import ProtectedRoute from "../auth/ProtectedRoute";
import EgresoFinanciero from "../pages/EgresoFinanciero";
import IngresoFinanciero from "../pages/IngresoFInanciero";

function Rutas() {
  return (
    <BrowserRouter>
            <Routes>

        {/* REDIRECCIÓN RAÍZ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLICA */}
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
            <Route path="/EgresoFinanciero" element={<EgresoFinanciero/>}/>
            <Route path="/IngresoFinanciero" element={<IngresoFinanciero/>}/>
            </Route>

        </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default Rutas;