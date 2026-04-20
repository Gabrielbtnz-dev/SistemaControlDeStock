import { useEffect, useState } from "react";
import DropdownSearch from "../assets/components/DropdownSearch"
import DataTable from "../assets/components/DataTable";

function Pdv(){
const[product,setProduct]=useState([]);
const [selectedProducts, setSelectedProducts] = useState([]);
const [search, setSearch] = useState("");

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
    setSelectedProducts(prev => [
    ...prev,
    {
      id: item.value,
      name: item.label,
      price: item.price
    }
  ]);
  setSearch("");
};

return(
    <div>
        <DropdownSearch
            label="Productos"
            options={productOptions}
            value={search}
            setValue={setSearch}
            onSelect={addProduct}
            />

        <DataTable
        data={selectedProducts}
        columns={[
            { key: "id", label: "Codigo" },
            { key: "name", label: "Nombre" },
            { key: "price", label: "Precio" },
          
        ]}
        />
    </div>
);
}
export default Pdv;