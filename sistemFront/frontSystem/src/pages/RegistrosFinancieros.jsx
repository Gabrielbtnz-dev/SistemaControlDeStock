import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { FilterInput } from "../assets/components/FilterInput";
import { FilterDropdown } from "../assets/components/FilterDropdown";
import { FilterDateRange } from "../assets/components/FilterDateRange";
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { TokenService } from "../auth/TokenService";
import axios from "axios";

function RegistrosFinancieros() {
    const [registrosFinancieros, setRegistrosFinancieros] = useState([]);
    const [filtroCod, setFiltroCod] = useState("");
    const [filtroPersona, setFiltroPersona] = useState("");
    const [filtroDesde, setFiltroDesde] = useState("");
    const [filtroHasta, setFiltroHasta] = useState("");
    const token = TokenService.getToken();

    const cargarRegistrosFinancieros = async () => {
        const response = await fetch("http://localhost:8085/registrofinanciero", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setRegistrosFinancieros(data);
    };

    useEffect(() => {
        cargarRegistrosFinancieros();
    }, []);

    const personas = [...new Set(registrosFinancieros.map(m => m.nombrePersona).filter(Boolean))];

    // Función helper para obtener fecha local en formato YYYY-MM-DD
        const toLocalDateString = (isoString) => {
            const date = new Date(isoString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };
    const datosFiltrados = registrosFinancieros.filter((row) => {
    const cod = `Financiero N: ${row.id}`;
    const fechaRow = toLocalDateString(row.fechaEmision);

    const pasaCod     = filtroCod === ""     || cod.toLowerCase().includes(filtroCod.toLowerCase());
    const pasaPersona = filtroPersona === "" || row.nombrePersona === filtroPersona;
    const pasaDesde   = filtroDesde === ""   || fechaRow >= filtroDesde;
    const pasaHasta   = filtroHasta === ""   || fechaRow <= filtroHasta;

    return pasaCod && pasaPersona && pasaDesde && pasaHasta;
    });
    const hayFiltros = filtroCod || filtroPersona || filtroDesde || filtroHasta;

    const limpiarFiltros = () => {
        setFiltroCod("");
        setFiltroPersona("");
        setFiltroDesde("");
        setFiltroHasta("");
    };

    return (
        <div className="w-full h-full flex flex-col min-h-0 gap-3">

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <FilterInput
                    label="Cod. registro"
                    placeholder="Ej: Financiero N: 1"
                    value={filtroCod}
                    onChange={setFiltroCod}
                />
                <FilterDropdown
                    label="Persona"
                    placeholder="Todas las personas"
                    options={personas}
                    value={filtroPersona}
                    onChange={setFiltroPersona}
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
                        key: "Cod. registro",
                        label: "Cod. registro",
                        render: (row) => `Financiero N: ${row.id}`
                    },
                    { key: "nombrePersona", label: "Persona" },
                    {
                        key: "valor",
                        label: "Valor",
                        render: (row) => (
                            <div className="flex items-center gap-2">
                                {row.tipo === "INGRESO" ? (
                                    <BanknoteArrowDown size={14} className="text-green-500" />
                                ) : (
                                    <BanknoteArrowUp size={14} className="text-red-500" />
                                )}
                                {new Intl.NumberFormat("es-PY", {
                                    style: "currency",
                                    currency: row.moneda || "PYG",
                                    minimumFractionDigits: 0
                                }).format(row.valor)}
                            </div>
                        )
                    },
                    { key: "tipo", label: "Tipo" },
                    { key: "moneda", label: "Moneda" },
                    {
                        key: "contado",
                        label: "Contado",
                        render: (row) => row.contado ? "Sí" : "No"
                    },
                    { key: "observacion", label: "Observación" },
                    {
                        key: "fechaEmision",
                        label: "Fecha",
                        render: (row) => new Date(row.fechaEmision).toLocaleDateString("es-PY")
                    },
                ]}
            />
        </div>
    );
}

export default RegistrosFinancieros;