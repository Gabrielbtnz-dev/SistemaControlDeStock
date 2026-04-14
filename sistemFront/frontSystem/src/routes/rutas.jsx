import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "../pages/dashboard"
import Entity from "../pages/entity"
import MainLayout from "../assets/layout/MainLayout"
import Product from "../pages/product"

function Rutas(){
    return(
        
        <BrowserRouter>
        
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Entity" element={<Entity />} />
                    <Route path="/Product" element={<Product/>}/>
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}
export default Rutas