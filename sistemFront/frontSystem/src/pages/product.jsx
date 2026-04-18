import { useEffect, useState } from "react";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import Modal from "../assets/components/Modal"
import Input from "../assets/components/Input"
import {Package, Trash, Pencil} from"lucide-react"
import Toggle from "../assets/components/Toggle"
import InputFilterText from "../assets/components/InputFilterText";
import DropDown from "../assets/components/DropDown";
import {Plus} from"lucide-react"
import AnimatedCheck from "../assets/components/AnimatedCheck";

function Product(){
  const[product,setProduct]=useState([]);
  const[openPopup,setOpenPopup]=useState(false);
  const [filterName, setFilterName] = useState("");
  const[moneda,setMoneda]=useState("");
  const[nombre,setNombre]=useState("");
  const[precio,setPrecio]=useState("");
  const[controlaStock,setControlaStock]=useState(false);
  const[showCheck,setShowCheck]=useState(false);
  const[mensajeRespuesta,setMensajeRespuesta]=useState("");

 const cargarProduct = async () => {

    const response = await fetch("http://localhost:8085/product");
    const data = await response.json();
    setProduct(data);
    console.log(data)
  };

  useEffect(()=>{

    cargarProduct();

  },[])

  const productosFiltrados = product.filter((p) =>
    p.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const addProduct = async () => {
    
    const data = {
      name:nombre,
      price:precio,
      moneda:moneda,
      controlaStock:controlaStock
    }
    console.log("se ejecuto el post")
    try{
    const response = await fetch("http://localhost:8085/addProduct",{
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if(result.succes = true){
          setMensajeRespuesta(result.message);
          setShowCheck(true);
          setTimeout(() => {
              setShowCheck(false);
            }, 1000);

        setOpenPopup(false)
        setPrecio("")
        setNombre("")
        setMoneda("")
        setControlaStock(false)

      }else{
        alert("Por algun motivo no se agrego el producto");
      }

    }catch(err){
        alert("Por algun motivo el servidor del sistema no respondio, contacte con Gabriel")
    }

    await cargarProduct();

    }
    

  return (
    
  <div className="h-full flex flex-col p-6">

      <AnimatedCheck show={showCheck} message={mensajeRespuesta}></AnimatedCheck>
  {openPopup &&
    <Modal onClose={ () => setOpenPopup(false) } title="Nuevo producto">
      <div className="flex gap-3">
        <Input 
        label="Nombre"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
        />
        <Input 
          label="Precio" 
          width="w-[120px]" 
          type="number"
          value={precio}
        onChange={(e)=>setPrecio(e.target.value)}
        />
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

      <div>
        <div className="flex"> 
        <Toggle 
          label="Controla Stock"
          value={controlaStock}
          onChange={setControlaStock}
          />
        </div>
        <div className="flex justify-end">
        <Button color="green" onClick={addProduct}>
          <div className="flex items-center">
              <Plus size={16}/>
            <span>Agregar</span>
          </div>
        </Button>
        </div>
      </div>
      
    </Modal>
  }
    <div className="flex justify-between items-center p-3">
      <div className="flex">
        <InputFilterText
          label="Buscar por nombre"
          value={filterName}
          onChange={setFilterName}
          placeholder="Buscar por nombre..."/>
      </div>

      <Button color="green" onClick={()=>setOpenPopup(true)}>
        <div className="flex items-center gap-1">
          <Package size={16}/>
          <Plus size={16}/>
        <span className="ml-2">Nuevo producto</span>
        </div>
      </Button>

    </div>
    
     <DataTable
        data={productosFiltrados}
        rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
        columns={[
          { key: "name", label: "Nombre" },
          {
             key: "price", 
             label: "precio",
            render: (p) => Number(p.price).toLocaleString("es-PY")},
          { key: "moneda", label: "moneda" },
          { 
            key: "controlaStock", 
            label: "controla Stock", 
            render: (p) => (p.controlaStock ? "Si" : "No")
          },
          { 
            key: "activo", 
            label: "Activo", 
            render: (p) => (p.activo ? "Si" : "Desactivado")
          },
          {
            render: (p) => (
              <div className="flex justify-end gap-3 items-center">
                
                {p.activo && (
                  <Trash
                    className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                    onClick={() => removeProduct(p.id)}
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
          },

        ]}
      />
  </div>
);
}
export default Product