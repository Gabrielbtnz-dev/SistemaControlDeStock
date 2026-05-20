import { useState, useEffect } from "react"
import InputFilterText from "../assets/components/InputFilterText"
import DataTable from "../assets/components/DataTable";


function CuentasCajas(){
    const[cuentasCajas,setCuentasCajas]=useState([])
    const[cuentasCajasFilterName,setCuentasCajasFilterName]=useState("")

    const cargarCuentasCajas = async () => {
    const response = await fetch("http://localhost:8085/cuentasCajas");
    const data = await response.json();
    setCuentasCajas(data);
  };

  useEffect(() => {
        cargarCuentasCajas();
    }, []);

  const cuentasCajasFilterNombre = cuentasCajas.filter((p)=>
    p.name.toLowerCase().includes(cuentasCajasFilterName.toLowerCase())
  )

  


    return(
        <div>
            <div className="flex justify-between items-center p-3">
                <div>
                    <InputFilterText
                    label="Buscar por nombre"
                    value={cuentasCajasFilterName}
                    onChange={setCuentasCajasFilterName}
                    placeholder="Buscar por nombre de cuenta..."/>
                </div>
            </div>
            <DataTable
                data={cuentasCajasFilterNombre}
                rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
                itemsPerPage={20}
                pagination={true}
                columns={[
                { key: "name", label: "Nombre" },
                {
                    key: "saldo",
                    label: "Saldo",
                    render: (row) =>
                        new Intl.NumberFormat("es-PY", {
                        style: "currency",
                        currency: "PYG",
                        minimumFractionDigits: 0
                        }).format(row.saldo)
                },
                { key: "moneda", label: "Moneda" }
                ]}
            />
        </div>
    )
}
export default CuentasCajas