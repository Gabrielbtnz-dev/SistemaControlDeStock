import { useEffect, useState } from "react";
import DropdownSearch from "../assets/components/DropdownSearch"
import DataTable from "../assets/components/DataTable";
import Input from "../assets/components/Input";
import Button from "../assets/components/button";
import { Banknote } from 'lucide-react';
import { Trash2 } from 'lucide-react';

function Pdv(){
const[product,setProduct]=useState([]);
const [selectedProducts, setSelectedProducts] = useState([]);
const [search, setSearch] = useState("");
const[totalVenta,setTotalVenta]=useState(0);
const [flash, setFlash] = useState(false);
const[cantidadProduct,setCantidadProduct]=useState(1);

    const cargarProduct = async () => {
        const response = await fetch("http://localhost:8085/product");
        const data = await response.json();
        setProduct(data);
        console.log(data)
  };

  useEffect(()=>{
  
      cargarProduct();
  
    },[])

    const productOptions = product.map(p => ({
        value: p.id,
        label: p.name,
        price: p.price
    }));


    const addProduct = (item) => {
    setTotalVenta(totalVenta + item.price);
    setSelectedProducts(prev => [
    ...prev,
    {
      id: item.value,
      name: item.label,
      price: item.price,
      cantidad: cantidadProduct
    }
  ]);
  setSearch("");
};

useEffect(() => {
  if (totalVenta > 0) {
    setFlash(true);

    const timer = setTimeout(() => {
      setFlash(false);
    }, 700); // milisegundos

    return () => clearTimeout(timer);
  }
}, [totalVenta]);

const vaciarCarrito = () =>{
    setSelectedProducts([]);
}

return(
    <div className="flex w-full gap-4 items-start">
        
        <div className="flex flex-col flex-1 gap-4 w-full">
            
            <div className="flex">
                <div className="w-96">
                    <DropdownSearch
                    label="Productos"
                    options={productOptions}
                    value={search}
                    setValue={setSearch}
                    onSelect={addProduct}
                    />
                </div>
                <div className="w-14">
                    <Input 
                    label="Cantidad"
                    value={cantidadProduct}
                    type="number"
                    onChange={(e)=>setCantidadProduct(e.target.value)}
                    />
                </div>
            </div>

            <span
                className={`font-semibold text-xl transition-colors duration-300 ${
                    flash ? "text-green-500" : "text-gray-900"
                }`}
                >
                Total: {totalVenta}
                </span>

            <DataTable
            data={selectedProducts}
            columns={[
                { key: "id", label: "Codigo" },
                { key: "name", label: "Nombre" },
                { key: "price", label: "Precio" },
                { key: "cantidad", label: "Cantidad" },
            ]}
            />

        </div>

        <div className="w-64 shrink-0 border border-gray-300 rounded-lg p-3 bg-gray-50">
            <div className="flex gap-2">

                <Button color="green">
                    <Banknote />
                    <span>Finalizar</span>
                </Button>

                <Button color="red" onClick={vaciarCarrito}>
                    <Trash2 />
                    <span>Vaciar Carrito</span>
                </Button>

            </div>
        </div>

    </div>
);
}
export default Pdv;