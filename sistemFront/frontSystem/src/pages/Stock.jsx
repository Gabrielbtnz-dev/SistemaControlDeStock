import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { FilterInput } from "../assets/components/FilterInput";
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { TokenService } from "../auth/TokenService";
import axios from "axios";

function Stock() {
    const [disponibilidadStock, setDisponibilidadStock] = useState([]);
    const [filtroProducto, setFiltroProducto] = useState("");
    const [filtroCod, setFiltroCod] = useState("");
    const token = TokenService.getToken();

    const cargarDisponibilidadStock = async () => {
        const response = await fetch("http://localhost:8085/disponibilidadstock",{
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                }
            });
        const data = await response.json();
        setDisponibilidadStock(data);
    };

    useEffect(() => {
        cargarDisponibilidadStock();
    }, []);

    const datosFiltrados = disponibilidadStock.filter((row) => {
        const pasaProducto = filtroProducto === "" || (row.nombreProducto ?? "").toLowerCase().includes(filtroProducto.toLowerCase());
        const pasaCod      = filtroCod === ""      || String(row.idProducto ?? "").toLowerCase().includes(filtroCod.toLowerCase());
        return pasaProducto && pasaCod;
    });

    const hayFiltros = filtroProducto || filtroCod;

    const limpiarFiltros = () => {
        setFiltroProducto("");
        setFiltroCod("");
    };

    return (

        <div className="w-full h-full flex flex-col min-h-0 p-1 gap-3">

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <FilterInput
                    label="Cod. producto"
                    placeholder="Ej: 12"
                    value={filtroCod}
                    onChange={setFiltroCod}
                    className="!min-w-[120px] w-32"
                />
                <FilterInput
                    label="Producto"
                    placeholder="Buscar producto..."
                    value={filtroProducto}
                    onChange={setFiltroProducto}
                />

                {hayFiltros && (
                    <button
                        onClick={limpiarFiltros}
                        className="self-end text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50 rounded-lg px-3 py-2 transition"
                    >
                        Limpiar filtros
                    </button>
                )}

                <span className="self-end pb-2 ml-auto text-xs text-gray-400">
                    {datosFiltrados.length} resultado{datosFiltrados.length !== 1 ? "s" : ""}
                </span>
            </div>

            <DataTable
                data={datosFiltrados}
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