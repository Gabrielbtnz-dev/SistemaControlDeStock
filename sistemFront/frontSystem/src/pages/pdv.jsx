import { useEffect, useState } from "react";
import DropdownSearch from "../assets/components/DropdownSearch"
import DataTable from "../assets/components/DataTable";
import Input from "../assets/components/Input";
import Button from "../assets/components/button";
import { Banknote, Trash } from 'lucide-react';
import { Trash2,UserRoundPlus } from 'lucide-react';
import  Modal  from "../assets/components/Modal";
import DropDown from "../assets/components/DropDown";
import BarcodeSearch from "../assets/components/BarcodeSearch"

function Pdv(){
const[product,setProduct]=useState([]);
const [selectedProducts, setSelectedProducts] = useState([]);
const [search, setSearch] = useState("");
const [flash, setFlash] = useState(false);
const[cantidadProduct,setCantidadProduct]=useState(1);
const [f3Pressed, setF3Pressed] = useState(false);
const [f8Pressed, setF8Pressed] = useState(false);
const [f2Pressed, setF2Pressed] = useState(false);
const [entidad, setEntidad] = useState([]);
const [selectedEntidad, setSelectedEntidad] = useState(null);
const [tipoPagoCobro,setTipoPagoCobro]=useState()
const [finalizarPdv,setFinalizarPdv]=useState(false)

    const cargarProduct = async () => {
        const response = await fetch("http://localhost:8085/product");
        const data = await response.json();
        setProduct(data);
        console.log(data)
  };

  const cargarEntidad = async () => {
        const response = await fetch("http://localhost:8085/personas");
        const data = await response.json();
        setEntidad(data);
        console.log(data)
  };

  const totalVenta = selectedProducts.reduce(
  (acc, p) => acc + (p.price * p.cantidad),
  0
);

  useEffect(()=>{
  
      cargarProduct();
      cargarEntidad();
  
    },[])

    const productOptions = product.map(p => ({
        value: p.id,
        label: p.name,
        price: p.price,
        codbarras: p.codigoDeBarras
    }));

    const entidadOptions = entidad.map(p => ({
        value: p.id,
        label: p.nombre
    }));


    const addProduct = (item) => {

    setSelectedProducts(prev => {
    const existe = prev.find(p => p.id === item.value);

    if (existe) {
      return prev.map(p =>
        p.id === item.value
          ? { ...p, cantidad: p.cantidad + Number(cantidadProduct) }
          : p
      );
    }

    return [
      ...prev,
      {
        id: item.value,
        name: item.label,
        price: item.price,
        cantidad: Number(cantidadProduct)
      }
    ];
  });

  setSearch("");
  setCantidadProduct(1);
};

    useEffect(() => {
        if (totalVenta > 0) {
            setFlash(true);

            const timer = setTimeout(() => {
            setFlash(false);
            }, 700); 

            return () => clearTimeout(timer);
        }
    }, [totalVenta]);

    const vaciarCarrito = () =>{
        setSelectedProducts([]);
    }

    const removeProduct = (id) => {
        const productoAEliminar = selectedProducts.find(p => p.id === id);  

        if (!productoAEliminar) return;

        setSelectedProducts(prev => prev.filter(p => p.id !== id));
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "F3") {
            e.preventDefault();
            setF3Pressed(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        }, []);

        useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "F8") {
            e.preventDefault();
            setF8Pressed(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        }, []);

        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.key === "F2") {
                e.preventDefault();
                setFinalizarPdv(true);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, []);


        const addEntidad = (item) => {
        setSelectedEntidad({
            id: item.value,
            nombre: item.label
        });

        setSearch("");
        setF8Pressed(false); // cerrar modal
        };

return(
    <div className="flex w-full gap-4 items-start">

        {f3Pressed && 
            <Modal onClose={() => setF3Pressed(false)} title={"Buscar Producto"}>
               <div className="w-96">
                    <DropdownSearch
                    label="Productos"
                    options={productOptions}
                    value={search}
                    setValue={setSearch}
                    onSelect={addProduct}
                    />
                </div>
            </Modal>
        }

        {f8Pressed && 
            <Modal onClose={() => setF8Pressed(false)} title={"Buscar Entidad"}>
               <div className="w-96">
                    <DropdownSearch
                    label="Nombre"
                    options={entidadOptions}
                    value={search}
                    setValue={setSearch}
                    onSelect={addEntidad}
                    />
                </div>
            </Modal>
        }

        {finalizarPdv &&
            <Modal onClose={() => setFinalizarPdv(false)} title={"Finalizar operacion"}>
                <div className="mt-2">
                    <DropDown 
                            label="Formas cobros"
                            value={tipoPagoCobro}
                            onChange={(e)=>setTipoPagoCobro(e.target.value)}
                            options={[
                            {value:"efectivo", label:"Efectivo"},
                            {value:"cheque", label:"Cheque"},
                            {value:"transferencia", label:"Transferencia"}
                            ]}
                    />
            </div>
                <div className="mt-1">
                    <Input
                    type="number"
                    />
                </div>
            </Modal>
        }
        <div className="flex flex-col flex-1 gap-4 w-full">
            
            <div className="flex gap-3">
                <div className="w-96">
                   < BarcodeSearch
                    options={productOptions}
                    searchKey="codbarras"
                    value={search}
                    setValue={setSearch}
                    onSelect={addProduct}
                    placeholder="Codigo de barras"
                    label="Codigo de barras"
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
            <div className="bottom-2 ml-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg flex flex-col gap-1">
                <div><span className="font-semibold">F2</span> → Finalizar venta</div>
                <div><span className="font-semibold">F3</span> → Buscar producto por nombre</div>
                <div><span className="font-semibold">F8</span> → Buscar entidad</div>
                </div>
            </div>
            
            <div className="flex gap-5">
            <span
                className={`font-semibold text-xl transition-colors duration-300 ${
                    flash ? "text-green-500" : "text-gray-900"
                }`}
                >
                Total: {totalVenta.toFixed(2)}
            </span>
            {selectedEntidad && (
            <div className="flex p-1 bg-blue-100 rounded gap-3 ">
                <UserRoundPlus/>
                Cliente: {selectedEntidad.nombre}
                <div className="flex justify-end items-center">
                    <Trash
                        className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                        onClick={() => setSelectedEntidad(null)}
                    />
                </div>
            </div>
            )}
            </div>
            <DataTable
            data={selectedProducts}
            columns={[
                { key: "id", label: "Codigo" },
                { key: "name", label: "Nombre" },
                { key: "price", label: "Precio" },
                {
                  label: "Total",
                  render: (p) => (p.price * p.cantidad).toFixed(2)
                },
                { key: "cantidad", label: "Cantidad" },
                {
                render: (p) => (
                <div className="flex justify-end gap-3 items-center">
                    <Trash
                        className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                        onClick={() => removeProduct(p.id)}
                    />
                </div>
                ),
            },
            ]}
            />

        </div>

        <div className="w-64 shrink-0 border border-gray-300 rounded-lg p-3 bg-gray-50">
            <div className="flex gap-2">

                <Button color="green" onClick={(e)=>setFinalizarPdv(true)}>
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