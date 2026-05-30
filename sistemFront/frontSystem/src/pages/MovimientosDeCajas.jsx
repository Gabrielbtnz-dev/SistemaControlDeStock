import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';

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
        /* CORRECCIÓN CLAVE: 
           - h-full y flex flex-col obligan a este contenedor a usar el alto que le asigne el layout principal.
           - min-h-0 le da permiso a la tabla de encogerse si la pantalla del monitor es muy chica.
        */
        <div className="w-full h-full flex flex-col min-h-0 p-1">
            <DataTable
                data={movimientosDeCajas}
                itemsPerPage={20} // Ahora funciona como un límite máximo, pero no romperá el alto
                pagination={true}
                columns={[
                    {
                        key: "Cod. venta/compra",
                        label: "Cod. venta/compra",
                        render: (row) =>
                            row.idVenta
                                ? `Venta N: ${row.idVenta}`
                                : `Compra N: ${row.idCompra}`
                    },
                    { key: "nombreCaja", label: "Cuenta caja" },
                    {
                        key: "monto",
                        label: "Valor",
                        render: (row) => (
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
                        )
                    },
                    { key: "tipoMovimiento", label: "Tipo" },
                    { key: "moneda", label: "Moneda" },
                    { key: "descripcion", label: "Descripción" },
                    { 
                        key: "fecha", 
                        label: "Fecha",
                        render: (row) => new Date(row.fecha).toLocaleDateString("es-PY")
                    },
                ]}
            />
        </div>
    );
}

export default MovimientosDeCajas;