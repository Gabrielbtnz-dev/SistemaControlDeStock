import { useEffect, useState } from "react"
import Button from "../assets/components/button";
import Modal from "../assets/components/Modal";
import Input from "../assets/components/Input";
import Toggle from "../assets/components/Toggle";
import AnimatedCheck from "../assets/components/AnimatedCheck";
import { UserRoundPlus } from "lucide-react";
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import DataTable from "../assets/components/DataTable";
function Entity(){

    const[persona,setPersona]=useState([])
    const[id,setId] = useState();
    const [nombre, setNombre] = useState("");
    const [documento, setDocumento] = useState("");
    const [digitoVerificador, setDigitoVerificador] = useState("");
    const [openPopUp,setOpenPopUp] = useState(false)
    const [esFuncionario,SetEsFuncionario] = useState(false)
    const [esCliente,setEsCliente] = useState(false)
    const [esContribuyente,setEsContribuyente] = useState(false)
    const [showCheck, setShowCheck] = useState(false);
    const [mensajeRespuesta, setMensajeRespuesta] = useState("");
     const [butonEdit, setButonEdit] = useState("");
    

    

    const abrirPopUp=()=>{
      setButonEdit(false)
      setOpenPopUp(!openPopUp)
      
    }

    const cargarPersonas = async () => {
    const response = await fetch("/personas");
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
        digitoVerificador: digitoVerificador,
        activo:true
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

const removePerson = async (id)=>{
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
const editEntidad=(p)=>{
  setId(p.id)
  setDigitoVerificador(p.digitoVerificador)
  setDocumento(p.documento)
  setEsCliente(p.cliente)
  setEsContribuyente(p.contribuyente)
  setNombre(p.nombre)
  SetEsFuncionario(p.funcionario)
  setOpenPopUp(true)
  setButonEdit(true)
}

  const updateEntidad = async ()=>{
    const data = {
        nombre,
        documento,
        cliente: esCliente,
        contribuyente: esContribuyente,
        funcionario: esFuncionario,
        digitoVerificador: digitoVerificador,
        activo:true
    }

    const idEdit = id;

    const response = await fetch(`http://192.168.0.174:8085/updatePerson/${idEdit}`,{
    method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.succes = true){
      setMensajeRespuesta("Cliente editado con exito !");
      setShowCheck(true);
      setTimeout(() => {
          setShowCheck(false);
        }, 1000);
    }

    await cargarPersonas();

    await cargarPersonas();

    setOpenPopUp(false);
    setNombre("");
    setDocumento("");
    setDigitoVerificador("");
    setEsCliente(false);
    setEsContribuyente(false);
    SetEsFuncionario(false);

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
        <Button color={butonEdit ? "blue": "green"} onClick={butonEdit ? updateEntidad : guardarEntidad}>
          <UserRoundPlus size={16} className="inline-block" /> 
          <span>{butonEdit ? "Editar":"Agregar"}</span>
          </Button>
        </div>
      </div>
      </Modal>
      }
      <DataTable
        data={persona}
        rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
        columns={[
          { key: "nombre", label: "Nombre" },
          { key: "documento", label: "Documento" },
          { key: "digitoVerificador", label: "DV" },

          {
            key: "funcionario",
            label: "Funcionario",
            render: (p) => (p.funcionario ? "Si" : "No"),
          },
          {
            key: "cliente",
            label: "Cliente",
            render: (p) => (p.cliente ? "Si" : "No"),
          },
          {
            key: "contribuyente",
            label: "Contribuyente",
            render: (p) => (p.contribuyente ? "Si" : "No"),
          },
          {
            render: (p) => (
              <div className="flex justify-end gap-3 items-center">
                
                {p.activo && (
                  <Trash
                    className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                    onClick={() => removePerson(p.id)}
                  />
                )}

                {p.activo && (
                  <Pencil
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => editEntidad(p)}
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


export default Entity