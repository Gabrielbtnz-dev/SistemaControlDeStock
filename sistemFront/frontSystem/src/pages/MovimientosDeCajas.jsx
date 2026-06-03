import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { FilterInput } from "../assets/components/FilterInput";
import { FilterDropdown } from "../assets/components/FilterDropdown";
import { FilterDateRange } from "../assets/components/FilterDateRange";
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';

function MovimientosDeCajas() {
    const [movimientosDeCajas, setMovimientoDeCajas] = useState([]);
    const [filtroCod, setFiltroCod] = useState("");
    const [filtroCaja, setFiltroCaja] = useState("");
    const [filtroDesde, setFiltroDesde] = useState("");
    const [filtroHasta, setFiltroHasta] = useState("");

    const cargarMovimientosDeCajas = async () => {
        const response = await fetch("http://localhost:8085/movimientosdecajas");
        const data = await response.json();
        setMovimientoDeCajas(data);
    };

    useEffect(() => {
        cargarMovimientosDeCajas();
    }, []);

    const cajas = [...new Set(movimientosDeCajas.map(m => m.nombreCaja).filter(Boolean))];

    const datosFiltrados = movimientosDeCajas.filter((row) => {
        const cod = row.idVenta ? `Venta N: ${row.idVenta}` : `Compra N: ${row.idCompra}`;
        const fechaRow = row.fecha.split("T")[0];
        console.log("fechaRow:", fechaRow, "| desde:", filtroDesde, "| hasta:", filtroHasta);

        const pasaCod   = filtroCod === ""    || cod.toLowerCase().includes(filtroCod.toLowerCase());
        const pasaCaja  = filtroCaja === ""   || row.nombreCaja === filtroCaja;
        const pasaDesde = filtroDesde === ""  || fechaRow >= filtroDesde;
        const pasaHasta = filtroHasta === ""  || fechaRow <= filtroHasta;

        return pasaCod && pasaCaja && pasaDesde && pasaHasta;
    });

    const hayFiltros = filtroCod || filtroCaja || filtroDesde || filtroHasta;

    const limpiarFiltros = () => {
        setFiltroCod("");
        setFiltroCaja("");
        setFiltroDesde("");
        setFiltroHasta("");
    };

    return (
        <div className="w-full h-full flex flex-col min-h-0  gap-3">

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <FilterInput
                    label="Cod. venta/compra"
                    placeholder="Ej: Venta N: 12"
                    value={filtroCod}
                    onChange={setFiltroCod}
                />
                <FilterDropdown
                    label="Cuenta caja"
                    placeholder="Todas las cajas"
                    options={cajas}
                    value={filtroCaja}
                    onChange={setFiltroCaja}
                />
                <FilterDateRange
                    label="Fecha"
                    desde={filtroDesde}
                    hasta={filtroHasta}
                    onDesdeChange={setFiltroDesde}
                    onHastaChange={setFiltroHasta}
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

            {/* Tabla */}
            <DataTable
                data={datosFiltrados}
                itemsPerPage={20}
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
                                    <BanknoteArrowDown size={14} className="text-green-500" />
                                ) : (
                                    <BanknoteArrowUp size={14} className="text-red-500" />
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