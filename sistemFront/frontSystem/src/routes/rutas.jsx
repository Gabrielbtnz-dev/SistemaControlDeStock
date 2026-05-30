import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Entity from "../pages/entity";
import Pdv from "../pages/pdv";
import MainLayout from "../assets/layout/MainLayout";
import Product from "../pages/product";
import CuentasCajas from "../pages/CuentasCajas";
import MovimientosDeCajas from "../pages/MovimientosDeCajas";
import VentasResumido from "../pages/VentasResumido";
import Pdc from "../pages/pdc";
import MovimientosDeStock from "../pages/MovimientosDeStock";

function Rutas(){
    return(
        
        <BrowserRouter>
        
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Entity" element={<Entity />} />
                    <Route path="/Product" element={<Product/>}/>
                    <Route path="/pdv" element={<Pdv/>} />
                    <Route path="/cuentasCajas" element={<CuentasCajas/>} />
                    <Route path="/movimientosdecaja" element={<MovimientosDeCajas/>} />
                    <Route path="/VentasResumido" element={<VentasResumido/>} />
                    <Route path="/Pdc" element={<Pdc/>} />
                    <Route path="/MovimientosDeStock" element={<MovimientosDeStock/>} />
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}
export default Rutas