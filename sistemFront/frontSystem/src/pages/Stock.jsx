import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';

function Stock() {
    const [disponibilidadStock, setDisponibilidadStock] = useState([]);

    const cargarDisponibilidadStock = async () => {
        const response = await fetch("http://localhost:8085/disponibilidadstock");
        const data = await response.json();
        setDisponibilidadStock(data);
    };

    useEffect(() => {
        cargarDisponibilidadStock();
    }, []);

    return (

        <div className="w-full h-full flex flex-col min-h-0 p-1">
            <DataTable
                data={disponibilidadStock}
                itemsPerPage={20}
                pagination={true}
                columns={[
                    {
                        key: "idProducto",
                        label: "Cod. Producto"
                    },
                    { key: "nombreProducto", 
                        label: "Producto" 
                    },
                    { key: "cantidad", 
                        label: "Disponible",
                        render: (row) => (
                            <div className="flex items-center gap-2">
                            <span
                                className={
                                row.cantidad === 1
                                    ? "text-red-500"
                                    : row.cantidad === 2
                                    ? "text-yellow-500"
                                    : row.cantidad < 3
                                    ? "text-red-500"
                                    : ""
                                }
                            >
                                {row.cantidad}
                            </span>
                            </div>
                        )
                    },
                    {
                        key: "precioUnitario",
                        label: "Precio",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.precioUnitario)}
                        </div>
                    },
                    {
                        key: "valorTotal",
                        label: "Valor",
                        render: (row) =>
                        <div className="flex items-center gap-2">
                            {new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.valorTotal)}
                        </div>
                    }
                ]}
            />
        </div>
    );
}

export default Stock;