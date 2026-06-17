import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";

// npm install jspdf jspdf-autotable
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const COLOR_INK = "#1C1917";
const COLOR_ACCENT = "#9A3B2B"; // terracota profundo, usado solo como acento
const COLOR_MUTED = "#78716C";

const currency = (value) =>
  new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("es-PY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function FacturaCard({ factura }) {
  const [generando, setGenerando] = useState(false);
  const nodeRef = useRef(null);

  const {
    id,
    idVenta,
    valorTotal,
    valorRegularizado,
    valorPendiente,
    observaciones,
    activo,
    createdAt,
    nombre,
    documento,
    digitoVerificador,
    items = [],
  } = factura;

  const numeroFactura = `${String(id ?? idVenta)}`;
  const saldada = Number(valorPendiente) === 0;

  const handleDescargar = () => {
    setGenerando(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = 48;

      // Encabezado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(28, 25, 23);
      doc.text("Documento interno N:", marginX, 64);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 113, 108);
      doc.text(numeroFactura, marginX, 82);

      // Estado, alineado a la derecha
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(saldada ? 22 : 154, saldada ? 101 : 59, saldada ? 52 : 43);
      doc.text(saldada ? "PAGADA" : "PENDIENTE", pageWidth - marginX, 64, {
        align: "right",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 113, 108);
      doc.text(formatDate(createdAt), pageWidth - marginX, 82, {
        align: "right",
      });

      // Línea separadora
      doc.setDrawColor(231, 229, 228);
      doc.line(marginX, 100, pageWidth - marginX, 100);

      // Datos del cliente
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(120, 113, 108);
      doc.text("CLIENTE", marginX, 124);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(28, 25, 23);
      doc.text(nombre, marginX, 140);

      doc.setFontSize(9);
      doc.setTextColor(120, 113, 108);
      doc.text(`Documento: ${documento}-${digitoVerificador}`, marginX, 154);

      // Tabla de items
      autoTable(doc, {
        startY: 180,
        margin: { left: marginX, right: marginX },
        head: [["Producto", "Cantidad", "Precio unit.", "Subtotal"]],
        body: items.map((it) => [
          it.nombre,
          String(it.cantidad),
          currency(it.precio),
          currency(it.valor),
        ]),
        styles: {
          font: "helvetica",
          fontSize: 10,
          textColor: [28, 25, 23],
          cellPadding: 8,
        },
        headStyles: {
          fillColor: [28, 25, 23],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [250, 250, 249] },
        columnStyles: {
          1: { halign: "right" },
          2: { halign: "right" },
          3: { halign: "right" },
        },
      });

      const finalY = doc.lastAutoTable.finalY + 24;

      // Totales
      const totalsX = pageWidth - marginX;
      const rows = [
        ["Total", valorTotal],
        ["Regularizado", valorRegularizado],
        ["Pendiente", valorPendiente],
      ];

      let y = finalY;
      rows.forEach(([label, value], idx) => {
        const isLast = idx === rows.length - 1;
        doc.setFont("helvetica", isLast ? "bold" : "normal");
        doc.setFontSize(isLast ? 12 : 10);
        doc.setTextColor(isLast ? 28 : 120, isLast ? 25 : 113, isLast ? 23 : 108);
        doc.text(label, totalsX - 160, y, { align: "left" });
        doc.text(currency(value), totalsX, y, { align: "right" });
        y += isLast ? 22 : 18;
      });

      if (observaciones) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(120, 113, 108);
        doc.text(`Obs.: ${observaciones}`, marginX, y + 16);
      }

      doc.save(`${numeroFactura}.pdf`);
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div
      ref={nodeRef}
      className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
    >
      {/* Encabezado */}
        <div className="px-7 pt-7 pb-5 border-b border-stone-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
                Venta N:
              </p>
              <p className="text-lg font-semibold text-stone-900 mt-0.5">
                {numeroFactura}
              </p>
            </div>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                saldada
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {saldada ? "Pagada" : "Pendiente"}
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-3">{formatDate(createdAt)}</p>
        </div>

        {/* Cliente */}
        <div className="px-7 py-5">
          <p className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase mb-1.5">
            Cliente
          </p>
          <p className="text-sm font-medium text-stone-900">{nombre}</p>
          <p className="text-xs text-stone-500 mt-0.5">
            {documento}-{digitoVerificador}
          </p>
        </div>

        {/* Items */}
        <div className="px-7 pb-5">
          <p className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase mb-2">
            Detalle
          </p>
          <div className="space-y-2.5">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-800">{item.nombre}</p>
                  <p className="text-xs text-stone-400">
                    {item.cantidad} x {currency(item.precio)}
                  </p>
                </div>
                <p className="text-sm font-medium text-stone-900">
                  {currency(item.valor)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totales */}
        <div className="px-7 py-5 bg-stone-50 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Total</span>
            <span className="text-stone-700">{currency(valorTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Regularizado</span>
            <span className="text-stone-700">{currency(valorRegularizado)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <span className="text-sm font-semibold text-stone-900">
              Pendiente
            </span>
            <span
              className={`text-base font-semibold ${
                saldada ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {currency(valorPendiente)}
            </span>
          </div>
        </div>

        {observaciones && (
          <div className="px-7 py-3 text-xs text-stone-400 italic border-t border-stone-100">
            {observaciones}
          </div>
        )}

        {/* Acción */}
        <div className="px-7 pb-7 pt-1">
          <button
            onClick={handleDescargar}
            disabled={generando}
            className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            {generando ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {generando ? "Generando PDF..." : "Descargar PDF"}
          </button>
        </div>
      </div>
  );
}

/* Ejemplo de uso:

import FacturaCard from "./FacturaCard";

const facturaEjemplo = {
  id: 123,
  valorTotal: 5000000.0,
  valorRegularizado: 5000000.0,
  valorPendiente: 0.0,
  observaciones: null,
  activo: true,
  createdAt: "2026-06-15T17:21:14.201938",
  personId: 170,
  nombre: "Ariel Gabriel Benitez Duarte",
  documento: "5484514",
  digitoVerificador: "10",
  items: [
    {
      precio: 5000000.0,
      valor: 5000000.0,
      cantidad: 1.0,
      idProducto: 135,
      nombre: "Harina",
    },
  ],
};

export default function App() {
  return <FacturaCard factura={facturaEjemplo} />;
}

*/