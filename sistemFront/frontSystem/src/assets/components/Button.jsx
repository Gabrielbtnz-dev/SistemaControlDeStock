export default function Button({ 
  children, 
  onClick, 
  color = "gray", 
  type = "button", 
  disabled = false, 
  ...props 
}) {
  
  const colors = {
    gray: "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500/20 active:bg-gray-100",
    red: "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20 active:bg-red-800",
    green: "border-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500/20 active:bg-emerald-800",
    blue: "border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20 active:bg-blue-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5 
        px-3 py-1.5 border rounded-md text-xs font-semibold 
        transition-all duration-150 
        focus:outline-none focus:ring-4
        active:scale-[0.98]
        disabled:opacity-50 disabled:pointer-events-none disabled:transform-none
        ${colors[color]}
      `}
      {...props}
    >
      {children}
    </button>
  );
}