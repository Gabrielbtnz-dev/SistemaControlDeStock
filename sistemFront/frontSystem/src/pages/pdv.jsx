import { useEffect, useState } from "react";
import DropdownSearch from "../assets/components/DropdownSearch"
import DataTable from "../assets/components/DataTable";
import Input from "../assets/components/Input";
import Button from "../assets/components/button";
import { Banknote, Trash, CircleDollarSign } from 'lucide-react';
import { Trash2,User } from 'lucide-react';
import  Modal  from "../assets/components/Modal";
import DropDown from "../assets/components/DropDown";
import BarcodeSearch from "../assets/components/BarcodeSearch"
import Swal from "sweetalert2";
import { TokenService } from "../auth/TokenService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Pdv(){
const[product,setProduct]=useState([]);
const[methodPaymed,setMethodPaymed]=useState([])
const [selectedProducts, setSelectedProducts] = useState([]);
const [search, setSearch] = useState("");
const [flash, setFlash] = useState(false);
const[cantidadProduct,setCantidadProduct]=useState(1);
const [f3Pressed, setF3Pressed] = useState(false);
const [f8Pressed, setF8Pressed] = useState(false);
const [f2Pressed, setF2Pressed] = useState(false);
const [entidad, setEntidad] = useState([]);
const [selectedEntidad, setSelectedEntidad] = useState(null);
const [tipoPagoCobro,setTipoPagoCobro]=useState();
const [finalizarPdv,setFinalizarPdv]=useState(false);
const[valorTotalCobro,setValorTotalCobro]=useState(null);
const [cobros, setCobros] = useState([]);
const [valorEnCobros, setValorEnCobros] = useState(0);
const [precioProduct,setPrecioProduct] = useState(0);

const navigate = useNavigate();

const token = TokenService.getToken();

    const cargarProduct = async () => {
    const response = await fetch("http://localhost:8085/product", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);

        Swal.fire({
            title: "Acceso denegado",
            text: data.message || "No tienes permisos",
            icon: "error",
            confirmButtonText: "Volver"
        });

        setProduct([]);

        navigate("/dashboard");
        return;
    }

    setProduct(Array.isArray(data) ? data : []);
    console.log(data);
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

const cargarMethodPaymed = async () => {
    const response = await fetch("http://localhost:8085/cuentasCajas",{
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
                }
    });
    const data = await response.json();
    setMethodPaymed(data);
  };

  const totalVenta = selectedProducts.reduce(
  (acc, p) => acc + (p.price * p.cantidad),
  0
);

  useEffect(()=>{
  
      cargarProduct();
      cargarEntidad();
      cargarMethodPaymed();
  
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
        price: Number(precioProduct || item.price),
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
        setCobros([]);
        setValorEnCobros(0);
        
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

                if (totalVenta === valorEnCobros) {
                return;
                }
                setFinalizarPdv(true);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [totalVenta, valorEnCobros]);


        const addEntidad = (item) => {
        setSelectedEntidad({
            id: item.value,
            nombre: item.label
        });

        setSearch("");
        setF8Pressed(false); // cerrar modal
        };

  
        const agregarCobro = (tipoId, valor) => {

        const metodo = methodPaymed.find(m => m.id == tipoId);

        setCobros([
            ...cobros,
            { 
            id: metodo.id,
            tipo: metodo.name,
            valor: Number(valor)
            }
        ]);

        setValorEnCobros(prev => prev + Number(valor));

        setTipoPagoCobro();
        setValorTotalCobro(0);
        };

        /*cierra el modal de cobros */
        useEffect(() => {
            console.log(cobros);
            console.log(valorEnCobros);
            setFinalizarPdv(false)
        }, [cobros]);

    const restante = totalVenta - valorEnCobros;

    useEffect(() => {
        setValorTotalCobro(restante > 0 ? restante : 0);
    }, [totalVenta, cobros]);

    const finalizarVenta = async () => {

        let diferenciaVentaCobro = totalVenta - valorEnCobros;

        if (selectedProducts.length === 0) {
            Swal.fire({
                title: "Productos requerido",
                text: "Seleccione  al menos un producto",
                icon: "warning",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Entendido"
                });
                return
            }
         if (diferenciaVentaCobro > 0) {
               
               Swal.fire({
                title: "El valor del cobro debe de ser igual al valor de la venta",
                text: "Seleccione  al menos un metodo de cobro",
                icon: "warning",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Entendido"
                });
                return
            }

        if (!selectedEntidad?.id) {
            Swal.fire({
                title: "Cliente requerido",
                text: "Seleccione un cliente",
                icon: "warning",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Entendido"
                });
            return
            }

    const venta = {
        idPerson: selectedEntidad.id,

        valorTotal: totalVenta,
        valorRegularizado: totalVenta,
        valorPendiente: 0,

        items: selectedProducts.map(p => ({
            idProducto: p.id,
            cantidad: p.cantidad,
            precio: p.price,
            valor: p.price * p.cantidad
        })),

        caja: cobros.map(c => ({
            idCaja: c.id,
            monto: c.valor,
            moneda: "PYG"
        }))
        
    };

    console.log(JSON.stringify(venta, null, 2));

    const response = await fetch("http://localhost:8085/addSales", {
        method: "POST",
        headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
        },
        body: JSON.stringify(venta)
    });

    const data = await response.json();

    console.log(data);
    window.location.reload();
    
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
            <Modal onClose={() => setFinalizarPdv(false)} title={"Metodos de cobro"}>
                <div className="mt-2">
                    <DropDown 
                        label="Formas cobros"
                        value={tipoPagoCobro}
                        onChange={(e)=>setTipoPagoCobro(Number(e.target.value))}
                        options={methodPaymed.map(method => ({
                            value: Number(method.id),
                            label: method.name
                            }))}
                    />
                </div>
                <div className="mt-1">
                    <Input
                    value={valorTotalCobro}
                    onChange={(e)=>setValorTotalCobro(e.target.value)}
                    type="number"
                    placeholder="Monto"
                    />
                </div>
                <div className=" flex mt-1 justify-center">
                <Button color="green" onClick={()=>agregarCobro(tipoPagoCobro,valorTotalCobro)}>
                    <CircleDollarSign />
                    <span>Agregar</span>
                </Button>
                </div>
            </Modal>
        }
        <div className="flex flex-col flex-1 w-full">
            
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
                <div className="w-16">
                    <Input 
                    label="Cantidad"
                    value={cantidadProduct}
                    type="number"
                    onChange={(e)=>setCantidadProduct(e.target.value)}
                    />
                </div>
                <div className="w-20">
                    <Input 
                    label="Precio"
                    value={precioProduct}
                    onChange={(e)=>setPrecioProduct(e.target.value)}
                    />
                </div>
            <div className="bottom-2 ml-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg flex flex-col gap-1">
                <div><span className="font-semibold">F2</span> → Finalizar venta</div>
                <div><span className="font-semibold">F3</span> → Buscar producto por nombre</div>
                <div><span className="font-semibold">F8</span> → Buscar entidad</div>
                </div>
            </div>
            
            <div className="flex gap-5 mb-1">
            <span
                className={`font-semibold text-xl transition-colors duration-300 ${
                    flash ? "text-green-500" : "text-gray-900"
                }`}
                >
                Total: {totalVenta.toLocaleString('es-PY')}
            </span>
            {selectedEntidad && (
            <div className="flex p-1 bg-blue-100 rounded gap-1 ">
                <User/>
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
                    valorEnCobros === 0 && (
                        <div className="flex justify-end gap-3 items-center">
                            <Trash
                                className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                onClick={() => removeProduct(p.id)}
                            />
                        </div>
                    )
                )
            },
            ]}
            />

        </div>

        <div className="shrink-0 border border-gray-300 rounded-lg p-3 bg-gray-50">
            <div className="flex gap-2">

                <Button color="green" onClick={(e)=>finalizarVenta()}>
                    <Banknote />
                    <span>Finalizar</span>
                </Button>

                <Button color="red" onClick={vaciarCarrito}>
                    <Trash2 />
                    <span>Vaciar Carrito</span>
                </Button>
            </div>
            <div className="flex gap-3 mt-2">
                <span className="px-1 py-1 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800">
                    Total: {totalVenta}
                </span>

                <span className="px-1 py-1 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800">
                    Saldo: {totalVenta - valorEnCobros}
                </span>
            </div>
            <span>Metodos de cobros</span>
            {cobros.map((cobro, index) => (
            <div key={index} className="flex">
                <span className="min-w-[120px] px-1 py-1 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800">
                {cobro.tipo}
                </span>
                <span className="min-w-[120px] px-1 py-1 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800">
                {cobro.valor}
                </span>
            </div>
            ))}
        </div>
            
    </div>
);
}
export default Pdv;