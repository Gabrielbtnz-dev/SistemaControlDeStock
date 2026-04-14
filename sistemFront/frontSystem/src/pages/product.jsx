import { useEffect, useState } from "react";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import {Package} from"lucide-react"
import {Plus} from"lucide-react"

function Product(){
  const[product,setProduct]=useState([]);

 const cargarProduct = async () => {

    const response = await fetch("http://localhost:8085/product");
    const data = await response.json();
    setProduct(data);
    console.log(data)
  };

  useEffect(()=>{

    cargarProduct();

  },[])

  return (
    
  <div className="h-full flex flex-col p-6">
    <div className="flex justify-end p-3">
      
      <Button color="green">
        <div className="flex items-center gap-1">
          <Package size={16}/>
          <Plus size={16}/>
        <span className="ml-2">Nuevo producto</span>
        </div>
      </Button>

    </div>
     <DataTable
        data={product}
        rowClassName={(p) => (!p.activo ? "bg-red-100" : "")}
        columns={[
          { key: "name", label: "Nombre" },
          { key: "price", label: "precio" },
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