import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown,BanknoteArrowUp } from 'lucide-react';

function VentasResumido() {

    const [sales, setsales] = useState([]);

    const cargarVenta = async () => {
        const response = await fetch("http://localhost:8085/sales");
        const data = await response.json();
        setsales(data);
    };

    useEffect(() => {
        cargarVenta();
    }, []);

    return (
        <div>
            <DataTable
                data={sales}
                itemsPerPage={20}
                pagination={true}
                columns={[
                    { key: "idVenta", label: "Cod. venta" },
                    { key: "namePerson", label: "Entidad" },
                    
                    {
                        key: "valorTotal",
                        label: "Valor total",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.valorTotal)}
                        </div>
                    },
                    {
                        key: "valorRegularizado",
                        label: "Valor regularizado",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.valorRegularizado)}
                        </div>
                    },
                    {
                        key: "valorPendiente",
                        label: "Valor pendiente",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.valorPendiente)}
                        </div>
                    },
                    { key: "observaciones", label: "Observacion" },
                ]}
            />
        </div>
    );
}

export default VentasResumido;