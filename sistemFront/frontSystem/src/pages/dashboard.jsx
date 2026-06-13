import { useState, useEffect, useCallback } from "react";
import { DashboardCard } from "../assets/components/DashboardCard";
import { DollarSign, Users, AlertTriangle, PackageOpen } from "lucide-react";
import DashboardGrafico from "../assets/components/DashboardGrafico";
import { TokenService } from "../auth/TokenService";

function Dashboard() {
    const [estadisticaVenta, setEstadisticaVenta] = useState(null);
    const [estadisticaStock, setEstadisticaStock] = useState(null);
    const [estadisticaPerson, setEstadisticaPerson] = useState(0);

    const token = TokenService.getToken();

    // 🔥 OPTIMIZADO: fetch reutilizable
    const fetchData = useCallback(async (url) => {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) throw new Error("Error en " + url);
        return res.json();
    }, [token]);

    // 🔥 OPTIMIZADO: carga paralela (más rápido)
    const cargarTodo = useCallback(async () => {
        try {
            const [ventas, stock, personas] = await Promise.all([
                fetchData("http://localhost:8085/ventasestadistica"),
                fetchData("http://localhost:8085/stockestadistica"),
                fetchData("http://localhost:8085/personactivos")
            ]);

            setEstadisticaVenta(ventas);
            setEstadisticaStock(stock);
            setEstadisticaPerson(personas);

        } catch (error) {
            console.error("Error cargando dashboard:", error);
        }
    }, [fetchData]);

    useEffect(() => {
        cargarTodo();
    }, [cargarTodo]);

    return (
        <div className="bg-gray-50">

            {/* CARDS */}
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

            {/* GRAFICO */}
            <div className="mt-6">
                <DashboardGrafico />
            </div>

        </div>
    );
}

export default Dashboard;