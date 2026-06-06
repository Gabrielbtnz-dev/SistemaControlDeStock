import { useState, useEffect } from "react";
import InputFilterText from "../assets/components/InputFilterText";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import { Landmark,Trash,Pencil,MoveUp, MoveDown } from 'lucide-react';
import Modal from "../assets/components/Modal";
import Input from "../assets/components/Input";
import DropDown from "../assets/components/DropDown";
import AnimatedCheck from "../assets/components/AnimatedCheck";
import Swal from 'sweetalert2'


function MovimientosDeStock(){
    const[movimientosDeStock,setMovimientosDeStock]=useState([])

    const cargarMovimientosDeStock = async () => {
    const response = await fetch("http://localhost:8085/movimientostock");
    const data = await response.json();
    setMovimientosDeStock(data);
    };

    useEffect(() => {
            cargarMovimientosDeStock();
    }, []);

  
    return(
        <div className="w-full h-full flex flex-col min-h-0">
            <DataTable
                data={movimientosDeStock}
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