import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown,BanknoteArrowUp } from 'lucide-react';

function MovimientosDeCajas() {

    const [movimientosDeCajas, setMovimientoDeCajas] = useState([]);

    const cargarMovimientosDeCajas = async () => {
        const response = await fetch("http://localhost:8085/movimientosdecajas");
        const data = await response.json();
        setMovimientoDeCajas(data);
    };

    useEffect(() => {
        cargarMovimientosDeCajas();
    }, []);

    return (
        <div>
            <DataTable
                data={movimientosDeCajas}
                itemsPerPage={20}
                pagination={true}
                columns={[
                    { key: "idVenta", label: "Cod. venta" },
                    { key: "nombreCaja", label: "Cuenta caja" },
                    {
                        key: "monto",
                        label: "Valor",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                           {row.tipoMovimiento === "INGRESO" ? (
                                <BanknoteArrowUp size={14} className="text-green-500" />
                            ) : (
                                <BanknoteArrowDown size={14} className="text-red-500" />
                            )}
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.monto)}
                        </div>
                    },
                    { key: "tipoMovimiento", label: "Tipo" },
                    { key: "moneda", label: "Moneda" },
                    { key: "descripcion", label: "Descripción" },
                    { key: "fecha", label: "Fecha" ,render: (row) =>
                        new Date(row.fecha).toLocaleDateString("es-PY")},
                ]}
            />
        </div>
    );
}

export default MovimientosDeCajas;