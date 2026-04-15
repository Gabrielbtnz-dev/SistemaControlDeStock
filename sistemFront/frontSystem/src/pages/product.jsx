import { useEffect, useState } from "react";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import Modal from "../assets/components/Modal"
import Input from "../assets/components/Input"
import {Package} from"lucide-react"
import Toggle from "../assets/components/Toggle"
import InputFilterText from "../assets/components/InputFilterText";
import {Plus} from"lucide-react"

function Product(){
  const[product,setProduct]=useState([]);
  const[openPopup,setOpenPopup]=useState(false);
  const [filterName, setFilterName] = useState("");

 const cargarProduct = async () => {

    const response = await fetch("/product");
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

  return (
    
  <div className="h-full flex flex-col p-6">
  {openPopup &&
    <Modal onClose={ () => setOpenPopup(false) } title="Nuevo producto">
      <div className="flex gap-3">
        <Input label="Nombre"></Input>
        <Input label="Precio" width="w-[120px]" type="number"></Input>
      </div>

      <div className="flex mt-3">
        <Toggle label="Controla Stock"></Toggle>
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

        ]}
      />
  </div>
);
}
export default Product