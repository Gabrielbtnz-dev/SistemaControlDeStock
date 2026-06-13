import { useState, useEffect } from "react";
import Input from "../assets/components/Input";
import { FilterDate } from "../assets/components/FilterDate";
import DropDown from "../assets/components/DropDown";
import Toggle from "../assets/components/Toggle";
import Button from "../assets/components/button";
import {BadgeDollarSign} from "lucide-react";
import { TokenService } from "../auth/TokenService";
import axios from "axios";
import Swal from "sweetalert2";

function EgresoFinanciero(){
const [fecha, setFecha] = useState("");
const [valorRegistroFinanciero,setValorRegistroFinanciero]=useState(0);
const [entidadSelecionada,setEntidadSelecionada]=useState("");
const [cuentaCajaseleccionada,setCuentaCajaseleccionada]=useState("");
const [observacion,setObservacion]=useState("");
const[cuentasCajas,setCuentasCajas]=useState([]);
const[entidad,setEntidad]=useState([]);

const token = TokenService.getToken();

const cargarMethodPaymed = async () => {
    const response = await fetch("http://localhost:8085/cuentasCajas",{
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                }
    });

    const data = await response.json();
    console.log("Cuentas cajas:", data);
    setCuentasCajas(data);
  };

  const cargarEntidad = async () => {
        const response = await fetch("http://localhost:8085/personas",{
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                }
        });
        const data = await response.json();
        setEntidad(data);
        console.log(data)
  };

  useEffect(()=>{

      cargarMethodPaymed();
      cargarEntidad();
  
    },[])

const guardarRegistroFinanciero = async () => {
    // Validación de campos obligatorios
    if (!fecha) {
        Swal.fire({
            title: "Falta la fecha de emisión",
            icon: "warning",
            confirmButtonColor: "#facc15",
            confirmButtonText: "Entendido"
        });
        return;
    }

    if (!cuentaCajaseleccionada) {
        Swal.fire({
            title: "Debe seleccionar una cuenta caja",
            icon: "warning",
            confirmButtonColor: "#facc15",
            confirmButtonText: "Entendido"
        });
        return;
    }

    if (!entidadSelecionada) {
        Swal.fire({
            title: "Debe seleccionar una entidad",
            icon: "warning",
            confirmButtonColor: "#facc15",
            confirmButtonText: "Entendido"
        });
        return;
    }

    if (!valorRegistroFinanciero || Number(valorRegistroFinanciero) <= 0) {
        Swal.fire({
            title: "El valor debe ser mayor a 0",
            icon: "warning",
            confirmButtonColor: "#facc15",
            confirmButtonText: "Entendido"
        });
        return;
    }

    try {
        const body = {
            valor: Number(valorRegistroFinanciero),
            fechaEmison: `${fecha}T12:00:00`,
            observacion: observacion,
            contado: true,
            tipoOperacion: "INGRESO",
            moneda: "PYG",
            idPerson: entidadSelecionada,
            movimientoCajas: [
                {
                    idCaja: cuentaCajaseleccionada,
                    monto: Number(valorRegistroFinanciero),
                    moneda: "PYG",
                    fecha: `${fecha}T12:00:00`
                }
            ]
        };

        const response = await fetch("http://localhost:8085/registrofinancieroegreso", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            Swal.fire({
                title: "No se pudo enviar el registro financiero",
                icon: "error",
                confirmButtonColor: "red",
                confirmButtonText: "Entendido"
            });
            return;
        }

        const data = await response.json();
        console.log("Registro guardado:", data);

        Swal.fire({
            title: "Registro financiero guardado correctamente",
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: "Entendido"
        });

        // Limpiar el formulario
        setValorRegistroFinanciero(0);
        setObservacion("");
        setFecha("");
        setEntidadSelecionada("");
        setCuentaCajaseleccionada("");

    } catch (err) {
        console.error("Error al guardar registro financiero:", err);
        Swal.fire({
            title: "Ocurrió un error inesperado",
            icon: "error",
            confirmButtonColor: "red",
            confirmButtonText: "Entendido"
        });
    }
};

return (
    <div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300">

            <div className="flex gap-3 w-80">
                <FilterDate
                    label="Fecha emisión"
                    value={fecha}
                    onChange={setFecha}
                />

                <DropDown 
                    label="Cuenta caja"
                    value={cuentaCajaseleccionada}
                    onChange={(e)=>setCuentaCajaseleccionada(e.target.value)}
                    options={cuentasCajas.map(method => ({
                            value: Number(method.id),
                            label: method.name
                            }))}
                    />
                
                <DropDown 
                    label="Entidad"
                    value={entidadSelecionada}
                    onChange={(e)=>setEntidadSelecionada(e.target.value)}
                    options={entidad.map(method => ({
                            value: Number(method.id),
                            label: method.nombre
                            }))}
                />

                <Input 
                    label="Tipo de operación"
                    value="EGRESO"
                />

            </div>
            <div className="flex gap-3 w-80 mt-5">
                <Input 
                    label="Moneda"
                    value="GS"
                    />
                <Toggle 
                    label="Contado"
                    value={true}
                    onChange={true}
                />
                <Input 
                    label="Valor"
                    value={valorRegistroFinanciero}
                    type="number"
                    onChange={(e)=>setValorRegistroFinanciero(e.target.value)}
                />
            </div>
            <div className="flex mt-5 gap-5">
                <div className="flex h-10 w-[550px]">
                    <Input 
                        label="Observación"
                        value={observacion}
                        onChange={(e)=>setObservacion(e.target.value)}
                        placeholder="Observaciones"
                    />
                </div>
                <div className="flex h-10 mt-3">
                    <Button color="green" onClick={guardarRegistroFinanciero}>
                    <BadgeDollarSign/>
                    <span>Guardar registro financiero</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
);
}
export default EgresoFinanciero