import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import { BanknoteArrowDown,BanknoteArrowUp } from 'lucide-react';
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import PageHeader from "../assets/components/PageHeader"

function ComprasResumido() {

    const [compra, setCompra] = useState([]);

    const cargarCompra = async () => {
        const response = await fetch("http://localhost:8085/comprasresumidas");
        const data = await response.json();
        setCompra(data);
    };


    const removeCompra = async(id) => {

      const response = await fetch(`http://localhost:8085/deletecompra/${id}`,{
      method: "DELETE",
        headers: { "Content-Type": "application/json" }
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

    return (
        <div className="w-full h-full flex flex-col min-h-0">
            
            <DataTable
                data={compra}
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