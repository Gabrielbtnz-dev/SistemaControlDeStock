export default function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* CUADRO */}
      <div className="bg-white rounded-2xl shadow-lg p-5 relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO */}
        <div>
          {children}
        </div>

      </div>
    </div>
  );
}