import { useEffect, useState } from "react"
import Button from "../assets/components/button";
import Modal from "../assets/components/Modal";
import Input from "../assets/components/Input";
import Toggle from "../assets/components/Toggle";
import AnimatedCheck from "../assets/components/AnimatedCheck";
import { UserRoundPlus } from "lucide-react";
import { Trash } from 'lucide-react';
function Entity(){

    const[persona,setPersona]=useState([])
    const [nombre, setNombre] = useState("");
    const [documento, setDocumento] = useState("");
    const [digitoVerificador, setDigitoVerificador] = useState("");
    const [openPopUp,setOpenPopUp] = useState(false)
    const [esFuncionario,SetEsFuncionario] = useState(false)
    const [esCliente,setEsCliente] = useState(false)
    const [esContribuyente,setEsContribuyente] = useState(false)
    const [showCheck, setShowCheck] = useState(false);
    const [mensajeRespuesta, setMensajeRespuesta] = useState("");
    

    

    const abrirPopUp=()=>{

      setOpenPopUp(!openPopUp)
    }

    const cargarPersonas = async () => {
    const response = await fetch("http://192.168.0.174:8085/personas");
    const data = await response.json();
    setPersona(data);
  };

  useEffect(()=>{
     cargarPersonas()
  },[])

const guardarEntidad = async () => {

    
      const data ={
        nombre,
        documento,
        cliente: esCliente,
        contribuyente: esContribuyente,
        funcionario: esFuncionario,
        digitoVerificador: digitoVerificador
        }

  try {
    const response = await fetch("http://192.168.0.174:8085/addPerson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.succes = true){
      setMensajeRespuesta("Cliente agregado con exito!");
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    }
    console.log("post exitoso:", result);
  } catch (err) {
    console.error("Error:", err);
    alert("Ocurrio algun error no pudimos agregar al cliente")
  }

  await cargarPersonas();

  console.log("cerrando modal...");
  setOpenPopUp(false);
  setNombre("");
  setDocumento("");
};

const removePerson= async (id)=>{
  const data={
    activo:false
  }
  const response = await fetch(`http://192.168.0.174:8085/updatePerson/${id}`,{
    method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.succes = true){
      setMensajeRespuesta("Cliente desactivado !");
      setShowCheck(true);
      setTimeout(() => {
          setShowCheck(false);
        }, 1000);
    }

    await cargarPersonas();
  
}

  return (
  <div className="h-full flex flex-col p-6">

    <div className="flex justify-end p-3">
      
<Button color="green" onClick={abrirPopUp}>
   <UserRoundPlus size={16} className="inline-block" /> 
  <span> Agregar nueva entidad</span>
  </Button>
</div>
 <AnimatedCheck show={showCheck} message={mensajeRespuesta}/>
{ openPopUp &&
      <Modal onClose={() => setOpenPopUp(false)}>

        <div className="flex gap-3">
            <div className="w-1/2">
              <Input label="Nombre" value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </div>

            <div className="w-1/2">
              <Input label="Documento" value={documento} onChange={(e)=> setDocumento(e.target.value)}/>
            </div>

            <div>
              <Input label="Digito verificador" type="number" width="w-[120px]" value={digitoVerificador} onChange={(e)=> setDigitoVerificador(e.target.value)} />
            </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div>
        <Toggle
                label="contribuyente"
                value={esContribuyente}
                onChange={setEsContribuyente}
                
              />
        </div>

        <div>
        <Toggle
                label="Funcionario"
                value={esFuncionario}
                onChange={SetEsFuncionario}
              />
        </div>

        <div>
        <Toggle
                label="Cliente"
                value={esCliente}
                onChange={setEsCliente}

              />
        </div>
      </div>

      <div>  
        <div className="flex justify-end p-3 w-50">
        <Button color="green" onClick={guardarEntidad}>
          <UserRoundPlus size={16} className="inline-block" /> 
          <span> Agregar</span>
          </Button>
        </div>
      </div>
      </Modal>
      }
    <div className="flex-1 overflow-y-auto bg-white shadow-md rounded-2xl">

      <table className="min-w-full text-sm text-left">

        <thead className=" bg-gray-100 sticky top-0 z-10 ">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Documento</th>
            <th className="px-6 py-3">DV</th>
            <th className="px-6 py-3">Funcionario</th>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Contribuyente</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {persona.map((p) => (
            <tr key={p.id} className={`items-center hover:bg-gray-50  ${!p.activo ? "bg-red-100":"" }`}>
              <td className="px-6 py-3">{p.nombre}</td>
              <td className="px-6 py-3">{p.documento}</td>
              <td className="px-6 py-3">{p.digitoVerificador}</td>
              <td className="px-6 py-3">{p.funcionario ? "Si" : "No"}</td>
              <td className="px-6 py-3">{p.cliente ? "Si" : "No"}</td>
              <td className="px-6 py-3">{p.contribuyente ? "Si" : "No"}</td>
              
              <td>{p.activo && <Trash className="hover:text-red-500 transition-colors duration-200" onClick={ () => removePerson(p.id) }/>}</td>
              
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  </div>
);
}


export default Entity