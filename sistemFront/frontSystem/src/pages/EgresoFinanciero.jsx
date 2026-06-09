import { useState, useEffect } from "react";
import Input from "../assets/components/Input";
import { FilterDate } from "../assets/components/FilterDate";
import DropDown from "../assets/components/DropDown";
import Toggle from "../assets/components/Toggle";
import Button from "../assets/components/button";
import {BadgeDollarSign} from "lucide-react";

function EgresoFinanciero(){
const [fecha, setFecha] = useState("");
const [valorRegistroFinanciero,setValorRegistroFinanciero]=useState(0);
const [entidadSelecionada,setEntidadSelecionada]=useState("");
const [cuentaCajaseleccionada,setCuentaCajaseleccionada]=useState("");
const [observacion,setObservacion]=useState("");


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
                    onChange={(e)=>setCuentaCajaseleccionada(Number(e.target.value))}
                    options={[
                        {value:"PYG", label:"Banco Atlas"},
                        {value:"RS", label:"Sudameris"},
                            {value:"USD", label:"Banco Basa"}
                        ]}
                />
                
                <DropDown 
                    label="Entidad"
                    value={entidadSelecionada}
                    onChange={(e)=>setEntidadSelecionada(Number(e.target.value))}
                    options={[
                        {value:"PYG", label:"Emilce Dahiana rolon"},
                        {value:"RS", label:"Ariel Gabriel Benitez Duarte"},
                            {value:"USD", label:"Andrea Meliza Benitez Rolon"}
                        ]}
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
                    <Button color="green">
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