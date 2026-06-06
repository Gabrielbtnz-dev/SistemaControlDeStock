import { useEffect, useState } from "react";
import DataTable from "../assets/components/DataTable";
import Button from "../assets/components/button";
import Modal from "../assets/components/Modal"
import Input from "../assets/components/Input"
import {Package, Trash, Pencil, EllipsisVertical} from"lucide-react"
import Toggle from "../assets/components/Toggle"
import InputFilterText from "../assets/components/InputFilterText";
import DropDown from "../assets/components/DropDown";
import {Plus, Save,ArrowRightLeft  } from"lucide-react"
import AnimatedCheck from "../assets/components/AnimatedCheck";
import Swal from "sweetalert2";

function Product(){
  const[product,setProduct]=useState([]);
  const[openPopup,setOpenPopup]=useState(false);
  const [filterName, setFilterName] = useState("");
  const[moneda,setMoneda]=useState("");
  const[nombre,setNombre]=useState("");
  const[precio,setPrecio]=useState("");
  const[modoEdit,setModoEdit]=useState(false);
  const[idProduct,setIdProduct]=useState();
  const[controlaStock,setControlaStock]=useState(false);
  const[showCheck,setShowCheck]=useState(false);
  const[mensajeRespuesta,setMensajeRespuesta]=useState("");
  const[codBarras,setCodBarras]=useState("");
  const[openPopupOpciones,setOpenPopupOpciones]=useState(false);
  const[openPopupAjusteStock,setOpenPopupAjusteStock]=useState(false);
  const[valorStock,setValorStock]=useState("");
  const[precioEnStock,setPrecioEnStock]=useState("");
  const[cantidadEnStock,setCantidadEnStock]=useState("");
  
  const[precioNuevoStock,setPrecioNuevoStock]=useState(0);
  const[cantidadAjusteStock,setCantidadAjusteStock]=useState(0);
  const[valorNuevoStock,setValorNuevoStock]=useState(0);
  const[tipoOperacionAjusteStock,setTipoOperacionAjusteStock]=useState("INGRESO");


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
      controlaStock:controlaStock,
      codigoDeBarras:codBarras
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
              Swal.fire({
              title: result.message,
              icon: "success",
              confirmButtonColor: "#28a745",
              confirmButtonText: "Aceptar"
              });

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

    const removeProduct = async(id) => {

      const response = await fetch(`http://localhost:8085/deleteProduct/${id}`,{
      method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();

      if(result.succes = true){
          setMensajeRespuesta(result.message);
          setShowCheck(true);
          setTimeout(() => {
              setShowCheck(false);
            }, 1000);

      await cargarProduct();

    }
  }

  const editProduct = (p) => {
    setModoEdit(true)
    setIdProduct(p.id)
    setNombre(p.name)
    setPrecio(p.price)
    setMoneda(p.moneda)
    setControlaStock(p.controlaStock)
    setCodBarras(p.codigoDeBarras)
    setPrecioEnStock(p.precioStock)
    setValorStock(p.valorEnStock)
    setCantidadEnStock(p.cantidad)
    setCantidadAjusteStock(0)
    setValorNuevoStock(0)
    setPrecioNuevoStock(0)
    setOpenPopupOpciones(true)
  }

  const abrirPopUp = () =>{
    setModoEdit(false)
    setNombre("")
    setPrecio("")
    setMoneda("")
    setPrecioEnStock("")
    setValorStock("")
    setControlaStock(false)
    setOpenPopup(true)
    setOpenPopupOpciones(false)
  }


   const updateProduct = async () => {

    const data = {
      name:nombre,
      price:precio,
      moneda:moneda,
      controlaStock:controlaStock,
      codigoDeBarras:codBarras
    }
    console.log("se ejecuto el post")
    try{
    const response = await fetch(`http://localhost:8085/updateProduct/${idProduct}`,{
      method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if(result.success){
          Swal.fire({
              title: result.message,
              icon: "success",
              confirmButtonColor: "#28a745",
              confirmButtonText: "Aceptar"
              });
        
        setIdProduct(0);
        setOpenPopup(false)
        setPrecio("")
        setNombre("")
        setMoneda("")
        setControlaStock(false)
        setCodBarras("")

      }else{
        alert("Por algun motivo no se pudo editar el producto");
      }

    }catch(err){
        alert("Por algun motivo el servidor del sistema no respondio, contacte con Gabriel")
    }

    await cargarProduct();

    }

    useEffect(() => {
      const precio = parseFloat(precioNuevoStock) || 0;
      const cantidad = parseFloat(cantidadAjusteStock) || 0;

      const total = precio * cantidad;

      setValorNuevoStock(total);
    }, [precioNuevoStock, cantidadAjusteStock]);


    const AjustarStock = async () => {

    const data = {
      precio:precioNuevoStock,
      cantidad:cantidadAjusteStock,
      valor:valorNuevoStock,
      tipo: tipoOperacionAjusteStock
    }
    console.log("se ejecuto el post")
    try{
    const response = await fetch(`http://localhost:8085/ajustarstock/${idProduct}`,{
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if(result.success){
          Swal.fire({
              title: result.message,
              icon: "success",
              confirmButtonColor: "#28a745",
              confirmButtonText: "Aceptar"
              });
        
        setIdProduct(0);
        setOpenPopup(false)
        setPrecio("")
        setNombre("")
        setMoneda("")
        setControlaStock(false)
        setCodBarras("")
        setOpenPopupAjusteStock(false)

      }else{
        alert("Por algun motivo no se pudo editar el producto");
      }

    }catch(err){
        alert("Por algun motivo el servidor del sistema no respondio, contacte con Gabriel")
    }

    await cargarProduct();

    }

  return (
    
  <div className="w-full h-full flex flex-col min-h-0">

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
        <div className="flex gap-3"> 
        <Toggle 
          label="Controla Stock"
          value={controlaStock}
          onChange={setControlaStock}
          />
      <Input 
        label="Codigo de barras"
        value={codBarras}
        onChange={(e)=>setCodBarras(e.target.value)}
        />
      </div>

        <div className="flex justify-end mt-2">
        <Button color={modoEdit ? "blue" : "green"} onClick={modoEdit ? updateProduct : addProduct}>
          <div className="flex items-center">
              <Save size={16}/>
            <span>{modoEdit ? "Editar" : "Agregar"}</span>
          </div>
        </Button>
        </div>
      </div>
  </Modal>
  }
  {openPopupOpciones &&
    <Modal onClose={ () => setOpenPopupOpciones(false) } title={"Gestión de producto"}>
      <div className="flex gap-3">
        <Button color="green" onClick={() => {
                                setOpenPopup(true);
                                setOpenPopupOpciones(false);
                              }}>
        <span className="ml-2">Editar Producto</span>
      </Button>
      <Button color="green" onClick={ () => {setOpenPopupAjusteStock(true); setOpenPopupOpciones(false); } }>
        <span className="ml-2">Ajustar Stock</span>
      </Button>
      </div>
    </Modal>
  }
  {openPopupAjusteStock &&
    <Modal
      onClose={() => setOpenPopupAjusteStock(false)}
      title={"Ajuste de stock manual"}
    >
  <div className="w-full max-w-2xl space-y-4">

    {/* FILA 1 */}
    <div className="grid grid-cols-2 gap-3 w-full">

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Nombre</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {nombre}
        </span>
      </div>

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Precio</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {precio}
        </span>
      </div>

    </div>

    {/* FILA 2 */}
    <div className="grid grid-cols-2 gap-3 w-full">

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Precio en stock</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {precioEnStock}
        </span>
      </div>

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Valor total en stock</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {valorStock}
        </span>
      </div>

    </div>

    {/* FILA 3 */}
    <div className="grid grid-cols-2 gap-3 w-full">

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Cantidad en stock</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {cantidadEnStock}
        </span>
      </div>

      <div className="flex flex-col w-full">
        <span className="text-xs text-gray-500">Moneda</span>
        <span className="w-full px-2 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 truncate">
          {moneda}
        </span>
      </div>

    </div>

    {/* INPUTS */}
    <div className="grid grid-cols-2 gap-3 w-full">

      <Input
        label="Precio"
        value={precioNuevoStock}
        onChange={(e) => setPrecioNuevoStock(Number(e.target.value))}
        className="w-full"
      />

      <Input
        label="Cantidad"
        value={cantidadAjusteStock}
        onChange={(e) => setCantidadAjusteStock(Number(e.target.value))}
        className="w-full"
      />

      <Input
        label="Valor"
        value={valorNuevoStock}
        className="w-full"
      />

      <DropDown 
        label="Tipo de operación"
        value={tipoOperacionAjusteStock}
        onChange={(e)=>setTipoOperacionAjusteStock(e.target.value)}
        options={[
          {value:"EGRESO", label:"Salida"},
           {value:"INGRESO", label:"Entrada"}
        ]}
      />

    </div>
    <div className="flex justify-end">
      <Button color="green" onClick={AjustarStock}>
        <ArrowRightLeft size={12} />
        <span>Ajustar Stock</span>
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

      <Button color="green" onClick={abrirPopUp}>
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
        itemsPerPage={20}
        pagination={true}
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
                  <EllipsisVertical
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