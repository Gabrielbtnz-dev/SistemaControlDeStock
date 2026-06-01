import { useState, useEffect } from "react";
import { DashboardCard } from "../assets/components/DashboardCard";
import { DollarSign, Users, AlertTriangle, PackageOpen } from 'lucide-react';
import DashboardGrafico from "../assets/components/DashboardGrafico";

function Dashboard() {
    const [estadisticaVenta, setEstadisticaVenta] = useState(null);
    const [estadisticaStock, setEstadisticaStock] = useState(null);
    const [estadisticaPerson, setEstadisticaPerson] = useState(0);

    const cargarEstadisticas = async () => {
        try {
            const response = await fetch("http://localhost:8085/ventasestadistica");
            const data = await response.json();
            setEstadisticaVenta(data);
        } catch (error) {
            console.error("Error cargando estadísticas de ventas:", error);
        }
    };

    const cargarEstadisticasStock = async () => {
        try {
            const response = await fetch("http://localhost:8085/stockestadistica");
            const data = await response.json();
            setEstadisticaStock(data);
        } catch (error) {
            console.error("Error cargando estadísticas de stock:", error);
        }
    };

    const cargarEstadisticasPerson = async () => {
        try {
            const response = await fetch("http://localhost:8085/personactivos");
            const data = await response.json();
            setEstadisticaPerson(data);
        } catch (error) {
            console.error("Error cargando personas activas:", error);
        }
    };

    useEffect(() => {
        cargarEstadisticas();
        cargarEstadisticasStock();
        cargarEstadisticasPerson();
    }, []);

    return (
        // Se removió 'overflow-hidden' para permitir el flujo natural en pantallas chicas
        <div className="bg-gray-50">
            {/* Grilla de Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Ventas del mes"
                    value={`Gs. ${estadisticaVenta?.totalVentaMesActual?.toLocaleString('es-PY') || 0}`}
                    trend={`${estadisticaVenta?.porcentaje || 0}%`}
                    isPositive={estadisticaVenta?.subio}
                    icon={DollarSign}
                    footerLeft={`Mes pasado: Gs. ${estadisticaVenta?.totalVentaMesAnterior?.toLocaleString('es-PY') || 0}`}
                />
                
                <DashboardCard
                    title="Valor total Stock"
                    value={`Gs. ${estadisticaStock?.totalStock?.toLocaleString('es-PY') || 0}`}
                    isPositive={true}
                    icon={PackageOpen}
                />
                
                <DashboardCard
                    title="Clientes Activos"
                    value={estadisticaPerson?.toLocaleString('es-PY') || 0}
                    isPositive={true}
                    icon={Users}
                />
                
                <DashboardCard
                    title="Cuentas a Vencer (30d)"
                    value="Gs. 8.400.000"
                    trend="-2.4%"
                    isPositive={false}
                    icon={AlertTriangle}
                    footerLeft="FUNCIONALIDAD EN DESARROLLO"
                    footerRight="ERROR 404"
                />
            </div>

            {/* Contenedor del Gráfico */}
            <div className="mt-6">
                <DashboardGrafico />
            </div>
        </div>
    );
}

export default Dashboard;