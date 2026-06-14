import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { FilterInput } from "../assets/components/FilterInput";
import { FilterDropdown } from "../assets/components/FilterDropdown";
import { FilterDateRange } from "../assets/components/FilterDateRange";
import { BanknoteArrowDown,BanknoteArrowUp } from 'lucide-react';
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import PageHeader from "../assets/components/PageHeader"
import { TokenService } from "../auth/TokenService";
import axios from "axios";

function ComprasResumido() {

    const token = TokenService.getToken();

    const [compra, setCompra] = useState([]);
    const [filtroCod, setFiltroCod] = useState("");
    const [filtroEntidad, setFiltroEntidad] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroDesde, setFiltroDesde] = useState("");
    const [filtroHasta, setFiltroHasta] = useState("");

    const cargarCompra = async () => {
        
        const response = await fetch("http://localhost:8085/comprasresumidas",{
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });
        const data = await response.json();
        setCompra(data);
    };


    const removeCompra = async(id) => {

      const response = await fetch(`http://localhost:8085/deletecompra/${id}`,{
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    });

      const result = await response.json();

      if(result.success){
          Swal.fire({
                title: "Compra eliminada",
                text: "Por favor certifique que la caja tenga el valor correcto",
                icon: "success",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Entendido"
                });
            };

      cargarCompra ();

    }

    useEffect(() => {
        cargarCompra();
    }, []);

    const entidades = [...new Set(compra.map(c => c.namePerson).filter(Boolean))];

    const datosFiltrados = compra.filter((row) => {
        const cod = `Compra N: ${row.idCompra}`;
        const fechaRow = row.createdAt ? row.createdAt.split("T")[0] : "";

        const pasaCod     = filtroCod === ""     || cod.toLowerCase().includes(filtroCod.toLowerCase());
        const pasaEntidad = filtroEntidad === "" || row.namePerson === filtroEntidad;
        const pasaEstado  = filtroEstado === ""  || (filtroEstado === "activo" ? row.activo : !row.activo);
        const pasaDesde   = filtroDesde === ""   || fechaRow >= filtroDesde;
        const pasaHasta   = filtroHasta === ""   || fechaRow <= filtroHasta;

        return pasaCod && pasaEntidad && pasaEstado && pasaDesde && pasaHasta;
    });

    const hayFiltros = filtroCod || filtroEntidad || filtroEstado || filtroDesde || filtroHasta;

    const limpiarFiltros = () => {
        setFiltroCod("");
        setFiltroEntidad("");
        setFiltroEstado("");
        setFiltroDesde("");
        setFiltroHasta("");
    };

    return (
        <div className="w-full h-full flex flex-col min-h-0 gap-3">

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <FilterInput
                    label="Cod. compra"
                    placeholder="Ej: Compra N: 12"
                    value={filtroCod}
                    onChange={setFiltroCod}
                />
                <FilterDropdown
                    label="Entidad"
                    placeholder="Todas las entidades"
                    options={entidades}
                    value={filtroEntidad}
                    onChange={setFiltroEntidad}
                />
                <FilterDropdown
                    label="Estado"
                    placeholder="Todos"
                    options={["activo", "inactivo"]}
                    value={filtroEstado}
                    onChange={setFiltroEstado}
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

            <DataTable
                data={datosFiltrados}
                rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
                itemsPerPage={20}
                pagination={true}
                columns={[
                    { key: "idCompra", label: "Cod. Compra" },
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
                    {
                        key: "createdAt",
                        label: "Fecha",
                        render: (row) => new Date(row.createdAt).toLocaleDateString("es-PY")
                    },
                    {
                        key: "acciones",
                        render: (p) => (
                        <div className="flex justify-end gap-3 items-center">
                            
                            {p.activo && (
                            <Trash
                                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                onClick={() => removeCompra(p.idCompra)}
                            />
                            )}

              </div>
            ),
          },
                ]}
            />
        </div>
    );
}

export default ComprasResumido;