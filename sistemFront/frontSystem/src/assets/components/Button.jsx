export default function Button({ children, onClick, color = "gray" }) {
  const colors = {
    gray: "border-gray-300 hover:bg-gray-100",
    red:   "border-red-500 bg-red-400 text-white hover:bg-red-600",
    green: "border-green-500 bg-green-400 text-white hover:bg-green-600",
    blue: "border-blue-500 bg-blue-400 text-white hover:bg-blue-600",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 border rounded text-xs font-medium transition active:scale-95 ${colors[color]}`}
    >
      {children}
    </button>
  );
}