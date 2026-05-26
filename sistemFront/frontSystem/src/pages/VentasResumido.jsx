import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown,BanknoteArrowUp } from 'lucide-react';
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

function VentasResumido() {

    const [sales, setsales] = useState([]);

    const cargarVenta = async () => {
        const response = await fetch("http://localhost:8085/sales");
        const data = await response.json();
        setsales(data);
    };


    const removeSales = async(id) => {

      const response = await fetch(`http://localhost:8085/deletesales/${id}`,{
      method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();

      if(result.success){
          Swal.fire({
                title: "Venta eliminada",
                text: "Por favor certifique que la caja tenga el valor correcto",
                icon: "success",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Entendido"
                });
            };

      cargarVenta();

    }

    useEffect(() => {
        cargarVenta();
    }, []);

    return (
        <div>
            <DataTable
                data={sales}
                rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
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
                    {
                        key: "acciones",
                        render: (p) => (
                        <div className="flex justify-end gap-3 items-center">
                            
                            {p.activo && (
                            <Trash
                                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                onClick={() => removeSales(p.idVenta)}
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

export default VentasResumido;