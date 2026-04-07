import { useEffect, useState } from "react"

function Entity(){

    const[persona,setPersona]=useState([])

    useEffect(()=>{
        fetch("http://localhost:8085/personas")
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setPersona(data)
        })


    },[])


     
  return (
  <div className="h-full flex flex-col p-6">

    <div className="flex-1 overflow-y-auto bg-white shadow-md rounded-2xl">

      <table className="min-w-full text-sm text-left text-gray-600">

        <thead className="bg-gray-100 sticky top-0 z-10">
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
            <tr key={p.documento} className="hover:bg-gray-50">
              <td className="px-6 py-3">{p.nombre}</td>
              <td className="px-6 py-3">{p.documento}</td>
              <td className="px-6 py-3">{p.digitoVerificador}</td>
              <td className="px-6 py-3">{p.funcionario ? "Si" : "No"}</td>
              <td className="px-6 py-3">{p.cliente ? "Si" : "No"}</td>
              <td className="px-6 py-3">{p.contribuyente ? "Si" : "No"}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  </div>
);
}


export default Entity