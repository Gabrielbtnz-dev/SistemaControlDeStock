import { useState, useEffect } from "react";
import InputFilterText from "../assets/components/InputFilterText";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import { FilterInput } from "../assets/components/FilterInput";
import { FilterDropdown } from "../assets/components/FilterDropdown";
import { FilterDateRange } from "../assets/components/FilterDateRange";
import { Landmark,Trash,Pencil,MoveUp, MoveDown } from 'lucide-react';
import Modal from "../assets/components/Modal";
import Input from "../assets/components/Input";
import DropDown from "../assets/components/DropDown";
import AnimatedCheck from "../assets/components/AnimatedCheck";
import Swal from 'sweetalert2'
import { TokenService } from "../auth/TokenService";
import axios from "axios";


function MovimientosDeStock(){
    const[movimientosDeStock,setMovimientosDeStock]=useState([])
    const [filtroCod, setFiltroCod] = useState("");
    const [filtroProducto, setFiltroProducto] = useState("");
    const [filtroEntidad, setFiltroEntidad] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroDesde, setFiltroDesde] = useState("");
    const [filtroHasta, setFiltroHasta] = useState("");

    const cargarMovimientosDeStock = async () => {
    const token = TokenService.getToken();
    const response = await fetch("http://localhost:8085/movimientostock", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    setMovimientosDeStock(data);
    };

    useEffect(() => {
            cargarMovimientosDeStock();
    }, []);

    const productos = [...new Set(movimientosDeStock.map(m => m.nombreProduct).filter(Boolean))];
    const entidades = [...new Set(movimientosDeStock.map(m => m.nombreCliente).filter(Boolean))];

    const datosFiltrados = movimientosDeStock.filter((row) => {
        const cod = row.idVenta
            ? `Venta N: ${row.idVenta}`
            : row.idCompra
                ? `Compra N: ${row.idCompra}`
                : "";
        const fechaRow = row.createdAt ? row.createdAt.split("T")[0] : "";

        const pasaCod      = filtroCod === ""      || cod.toLowerCase().includes(filtroCod.toLowerCase());
        const pasaProducto = filtroProducto === "" || row.nombreProduct === filtroProducto;
        const pasaEntidad  = filtroEntidad === ""  || row.nombreCliente === filtroEntidad;
        const pasaTipo     = filtroTipo === ""     || row.tipomovimiento === filtroTipo;
        const pasaDesde    = filtroDesde === ""    || fechaRow >= filtroDesde;
        const pasaHasta    = filtroHasta === ""    || fechaRow <= filtroHasta;

        return pasaCod && pasaProducto && pasaEntidad && pasaTipo && pasaDesde && pasaHasta;
    });

    const hayFiltros = filtroCod || filtroProducto || filtroEntidad || filtroTipo || filtroDesde || filtroHasta;

    const limpiarFiltros = () => {
        setFiltroCod("");
        setFiltroProducto("");
        setFiltroEntidad("");
        setFiltroTipo("");
        setFiltroDesde("");
        setFiltroHasta("");
    };

  
    return(
        <div className="w-full h-full flex flex-col min-h-0 gap-3">

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                <FilterInput
                    label="Cod. venta/compra"
                    placeholder="Ej: Venta N: 12"
                    value={filtroCod}
                    onChange={setFiltroCod}
                />
                <FilterDropdown
                    label="Producto"
                    placeholder="Todos los productos"
                    options={productos}
                    value={filtroProducto}
                    onChange={setFiltroProducto}
                />
                <FilterDropdown
                    label="Entidad"
                    placeholder="Todas las entidades"
                    options={entidades}
                    value={filtroEntidad}
                    onChange={setFiltroEntidad}
                />
                <FilterDropdown
                    label="Tipo"
                    placeholder="Todos"
                    options={["INGRESO", "EGRESO"]}
                    value={filtroTipo}
                    onChange={setFiltroTipo}
                    width="min-w-[120px] w-32"
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
                itemsPerPage={20}
                pagination={true}
                columns={[
                    {
                        key: "Cod.",
                        label: "Cod.",
                        render: (row) => row.idVenta ?? row.idCompra ?? "-"
                    },

                    { key: "idStock", label: "Cod. stock" },

                    { key: "nombreProduct", label: "Producto" },
                    { key: "nombreCliente", label: "Entidad" },

                    { key: "cantidad", label: "Cantidad" },

                    {
                        key: "valor",
                        label: "Valor",
                        render: (row) =>
                            new Intl.NumberFormat("es-PY", {
                                style: "currency",
                                currency: "PYG",
                                minimumFractionDigits: 0
                            }).format(row.valor)
                    },

                    { key: "moneda", label: "Moneda" },

                    {
                        key: "tipomovimiento",
                        label: "Tipo",
                        render: (row) => (
                            <div className="flex items-center gap-2">
                                {row.tipomovimiento === "INGRESO" ? (
                                    <MoveDown size={14} className="text-green-500" />
                                ) : (
                                     <MoveUp size={14} className="text-red-500" />
                                )}

                                <span
                                    className={
                                        row.tipomovimiento === "INGRESO"
                                            ? "text-green-500 font-medium"
                                            : "text-red-500 font-medium"
                                    }
                                >
                                    {row.tipomovimiento}
                                </span>
                            </div>
                        )
                    },

                    { key: "observacion", label: "Operación" },
                    { 
                        key: "createdAt", 
                        label: "Fecha",
                        render: (row) => new Date(row.createdAt).toLocaleDateString("es-PY")
                    },
                
                ]}
            />
        </div>
    )
}
export default MovimientosDeStock