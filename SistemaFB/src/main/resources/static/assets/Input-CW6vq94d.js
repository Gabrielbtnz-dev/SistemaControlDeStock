import{n as e}from"./index-DXOv8NCQ.js";var t=e();function n({children:e,onClick:n,color:r=`gray`,type:i=`button`,disabled:a=!1,...o}){return(0,t.jsx)(`button`,{type:i,onClick:n,disabled:a,className:`
        inline-flex items-center justify-center gap-1.5 
        px-3 py-1.5 border rounded-md text-xs font-semibold 
        transition-all duration-150 
        focus:outline-none focus:ring-4
        active:scale-[0.98]
        disabled:opacity-50 disabled:pointer-events-none disabled:transform-none
        ${{gray:`border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500/20 active:bg-gray-100`,red:`border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20 active:bg-red-800`,green:`border-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500/20 active:bg-emerald-800`,blue:`border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20 active:bg-blue-800`}[r]}
      `,...o,children:e})}function r({label:e,type:n=`text`,value:r,onChange:i,placeholder:a,width:o=`w-full`,readOnly:s}){return(0,t.jsxs)(`div`,{className:`flex flex-col gap-1 ${o}`,children:[e&&(0,t.jsx)(`label`,{className:`text-xs font-medium text-gray-600 whitespace-nowrap`,children:e}),(0,t.jsx)(`input`,{type:n,value:r,onChange:i,placeholder:a,className:`border border-gray-300 rounded-lg px-3 py-1 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`,readOnly:s})]})}export{n,r as t};