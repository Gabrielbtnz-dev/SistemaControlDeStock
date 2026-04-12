export default function Button({ children, onClick, color = "gray" }) {
  const colors = {
    gray: "border-gray-300 hover:bg-gray-100",
    red: "border-red-400 hover:bg-red-50",
    green: "border-green-500 bg-green-400 text-white hover:bg-green-600",
    blue: "border-blue-500 bg-blue-400 text-white hover:bg-blue-600",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 px-4 py-2 border rounded text-sm font-medium transition active:scale-95 ${colors[color]}`}
    >
      {children}
    </button>
  );
}