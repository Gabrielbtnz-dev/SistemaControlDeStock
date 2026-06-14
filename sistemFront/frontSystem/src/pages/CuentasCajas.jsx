import { useState, useEffect } from "react";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import { FilterInput } from "../assets/components/FilterInput";
import { FilterDropdown } from "../assets/components/FilterDropdown";
import { Landmark,Trash,Pencil } from 'lucide-react';
import Modal from "../assets/components/Modal";
import Input from "../assets/components/Input";
import DropDown from "../assets/components/DropDown";
import AnimatedCheck from "../assets/components/AnimatedCheck";
import Swal from 'sweetalert2'
import { TokenService } from "../auth/TokenService";
import axios from "axios";


function CuentasCajas(){
    const[cuentasCajas,setCuentasCajas]=useState([])
    const[cuentasCajasFilterName,setCuentasCajasFilterName]=useState("");
    const[filterMoneda,setFilterMoneda]=useState("");
    const[openNuevaCuentaCaja,setOpenNuevaCuentaCaja]=useState(false);
    const[nombre,setNombre]=useState();
    const[moneda,setMoneda]=useState();
    const[showCheck,setShowCheck]=useState(false);
    const[mensajeRespuesta,setMensajeRespuesta]=useState("");


    const cargarCuentasCajas = async () => {
    const token = TokenService.getToken();
    const response = await fetch("http://localhost:8085/cuentasCajas",{
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    setCuentasCajas(data);
    };

    useEffect(() => {
            cargarCuentasCajas();
        }, []);

    const monedas = [...new Set(cuentasCajas.map(c => c.moneda).filter(Boolean))];

    const cuentasCajasFilterNombre = cuentasCajas.filter((p)=> {
        const pasaNombre = p.name.toLowerCase().includes(cuentasCajasFilterName.toLowerCase());
        const pasaMoneda = filterMoneda === "" || p.moneda === filterMoneda;
        return pasaNombre && pasaMoneda;
    })

    const hayFiltros = cuentasCajasFilterName || filterMoneda;

    const limpiarFiltros = () => {
        setCuentasCajasFilterName("");
        setFilterMoneda("");
    };

    const addCuentasCajas= async () => {
    const token = TokenService.getToken();
    const data = {
      name:nombre,
      moneda:moneda
    }
    console.log("se ejecuto el post")
    try{
    const response = await fetch("http://localhost:8085/addCuentasCajas",{
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
      const result = await response.json();

      if(result.success){
          setMensajeRespuesta(result.message);
          setShowCheck(true);
          setTimeout(() => {
              setShowCheck(false);
            }, 1000);

        setOpenNuevaCuentaCaja(false)
        setNombre("")
        setMoneda("")

      }else{
        alert("Por algun motivo no se agrego el producto");
      }

    }catch(err){
        console.error(err);
        alert("Por algun motivo el servidor del sistema no respondio, contacte con Gabriel")
    }

    await cargarCuentasCajas();
    

    }
    
    const removeCuentasCajas = async (id)=>{
    const token = TokenService.getToken();
    const response = await fetch(`http://localhost:8085/deleteCuentasCajas/${id}`,{
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });
      const result = await response.json();

      if(result.success){
        Swal.fire({
            title: result.message,
            icon: "success",
            confirmButtonColor: "#28a745",
            confirmButtonText: "Entendido"
            });
        }
        if(!result.success){
            Swal.fire({
            title: result.message,
            icon: "error",
            confirmButtonColor: "red",
            confirmButtonText: "Entendido"
        });
      }
      await cargarCuentasCajas();

    }
  


    return(
        <div className="w-full h-full flex flex-col min-h-0">
            <AnimatedCheck show={showCheck} message={mensajeRespuesta}></AnimatedCheck>
            {openNuevaCuentaCaja &&
                <Modal onClose={() => setOpenNuevaCuentaCaja(false)} title={"Agregar nueva cuenta caja"}>

                <div className="flex gap-3">
                    <div className="w-1/2">
                        <Input label="Nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                    </div>
                    <div className="w-1/2">
                        <DropDown 
                                label="Moneda"
                                value={moneda}
                                onChange={(e)=>setMoneda(e.target.value)}
                                options={[
                                  {value:"PYG", label:"Guaranies"},
                                   {value:"RS", label:"Reales"},
                                    {value:"USD", label:"Dolares"}
                                ]}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <Button color="green" onClick={()=>addCuentasCajas()}>
                        <Landmark />
                        <span>Agregar</span>
                    </Button>
                </div>
            </Modal>

            }

            {/* Barra de filtros */}
            <div className="flex flex-wrap gap-3 items-end justify-between bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-3">
                <div className="flex flex-wrap gap-3 items-end">
                    <FilterInput
                        label="Nombre"
                        placeholder="Nombre de cuenta..."
                        value={cuentasCajasFilterName}
                        onChange={setCuentasCajasFilterName}
                    />
                    <FilterDropdown
                        label="Moneda"
                        placeholder="Todas"
                        options={monedas}
                        value={filterMoneda}
                        onChange={setFilterMoneda}
                        width="min-w-[120px] w-32"
                    />

                    {hayFiltros && (
                        <button
                            onClick={limpiarFiltros}
                            className="self-end text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:bg-blue-50 rounded-lg px-3 py-2 transition"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>

                <Button color="green" onClick={()=>setOpenNuevaCuentaCaja(true)}>
                    <Landmark />
                    <span>Nueva cuenta caja</span>
                </Button>
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
                { key: "moneda", label: "Moneda" },
                {
                    render: (p) => (
                        <div className="flex justify-end gap-3 items-center">
                            
                            {p.activo && (
                            <Trash
                                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                onClick={() => removeCuentasCajas(p.id)}
                            />
                            )}

                            {p.activo && (
                            <Pencil
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() => editProduct(p)}
                            />
                            )}

                        </div>
                        ),
                }
                ]}
            />
        </div>
    )
}
export default CuentasCajas