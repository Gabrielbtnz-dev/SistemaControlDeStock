import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

function InputField({ icon: Icon, label, type, value, onChange, placeholder, delay }) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px", animation:`fadeUp 0.4s ease-out ${delay}s both` }}>
      <label style={{ fontSize:"11px", fontWeight:600, color:"#94a3b8", letterSpacing:"0.08em", textTransform:"uppercase" }}>
        {label}
      </label>
      <div
        style={{
          position:"relative", display:"flex", alignItems:"center", gap:"10px",
          height:"46px", padding:"0 14px",
          borderRadius:"8px",
          background: focused ? "#0f172a" : "#0c1525",
          border:`1.5px solid ${focused ? "#3b82f6" : "rgba(148,163,184,0.1)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
          transition:"all 0.18s ease",
        }}
      >
        <span style={{ flexShrink:0, color: focused ? "#3b82f6" : "#475569", transition:"color 0.18s", display:"flex" }}>
          <Icon size={15} strokeWidth={1.8} />
        </span>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:"14px", color:"#e2e8f0", caretColor:"#3b82f6" }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#475569", display:"flex", padding:0, transition:"color 0.15s" }}
            onMouseOver={e => e.currentTarget.style.color = "#94a3b8"}
            onMouseOut={e => e.currentTarget.style.color = "#475569"}
            aria-label={visible ? "Ocultar" : "Mostrar"}
          >
            {visible ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Completá todos los campos para continuar."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setError("Credenciales incorrectas. Verificá tus datos."); }, 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes errorIn {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        input::placeholder { color:rgba(71,85,105,0.6) !important; }
        .submit-btn { transition:background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease; }
        .submit-btn:not(:disabled):hover { background:#1d4ed8 !important; box-shadow:0 4px 20px rgba(29,78,216,0.35) !important; transform:translateY(-1px); }
        .submit-btn:not(:disabled):active { transform:translateY(0); }
        .forgot-link { transition:color 0.15s; }
        .forgot-link:hover { color:#93c5fd !important; }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Inter', sans-serif", background:"#070d1a" }}>

        {/* ── Left panel — branding ── */}
        <div
          style={{
            display:"none",
            flex:"none", width:"45%",
            background:"linear-gradient(160deg,#0f1f3d 0%,#0a1628 50%,#06101e 100%)",
            borderRight:"1px solid rgba(255,255,255,0.05)",
            padding:"56px 52px",
            flexDirection:"column",
            justifyContent:"space-between",
            position:"relative",
            overflow:"hidden",
            ...(mounted ? { display:"flex" } : {}),
            animation: mounted ? "fadeIn 0.6s ease-out both" : "none",
          }}
        >
          {/* Geometric accent top-right */}
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"260px", height:"260px", borderRadius:"50%", border:"1px solid rgba(59,130,246,0.08)" }} />
          <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"180px", height:"180px", borderRadius:"50%", border:"1px solid rgba(59,130,246,0.06)" }} />
          {/* Geometric accent bottom-left */}
          <div style={{ position:"absolute", bottom:"-80px", left:"-40px", width:"300px", height:"300px", borderRadius:"50%", border:"1px solid rgba(59,130,246,0.05)" }} />

          {/* Logo */}
          <div style={{ animation:"fadeUp 0.5s ease-out 0.1s both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span style={{ fontSize:"15px", fontWeight:600, color:"#f1f5f9", letterSpacing:"-0.2px" }}>SatSystem</span>
            </div>
          </div>

          {/* Center copy */}
          <div style={{ animation:"fadeUp 0.5s ease-out 0.2s both" }}>
            <p style={{ fontSize:"11px", fontWeight:600, color:"#3b82f6", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"16px" }}>
              Plataforma de gestión
            </p>
            <h2 style={{ fontSize:"32px", fontWeight:600, color:"#f1f5f9", lineHeight:1.25, letterSpacing:"-0.5px", margin:"0 0 16px" }}>
              Administrá tu negocio<br />desde un solo lugar
            </h2>
            <p style={{ fontSize:"14px", color:"#64748b", lineHeight:1.7, margin:0, maxWidth:"320px" }}>
              Accedé a ventas, compras, reportes y movimientos de caja con total seguridad y en tiempo real.
            </p>

            {/* Feature list */}
            <div style={{ marginTop:"36px", display:"flex", flexDirection:"column", gap:"12px" }}>
              {[
                "Control de inventario y stock",
                "Reportes financieros en tiempo real",
                "Gestión de clientes y proveedores",
              ].map((f, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:"rgba(37,99,235,0.15)", border:"1px solid rgba(59,130,246,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize:"13px", color:"#94a3b8" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ animation:"fadeUp 0.5s ease-out 0.3s both" }}>
            <p style={{ fontSize:"11px", color:"#334155", margin:0 }}>
              © 2026 SatSystem S.A. · Todos los derechos reservados
            </p>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div
          style={{
            flex:1, display:"flex", alignItems:"center", justifyContent:"center",
            padding:"40px 24px",
            background:"#070d1a",
          }}
        >
          <div style={{ width:"100%", maxWidth:"360px", animation:"fadeUp 0.5s ease-out 0.15s both" }}>

            {/* Mobile logo */}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"40px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"7px", background:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span style={{ fontSize:"14px", fontWeight:600, color:"#94a3b8" }}>SatSystem</span>
            </div>

            {/* Heading */}
            <div style={{ marginBottom:"32px" }}>
              <h1 style={{ fontSize:"22px", fontWeight:600, color:"#f1f5f9", letterSpacing:"-0.3px", margin:"0 0 6px" }}>
                Iniciá sesión
              </h1>
              <p style={{ fontSize:"13px", color:"#475569", margin:0 }}>
                Ingresá tus credenciales para acceder
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>

                <InputField icon={Mail} label="Correo electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@empresa.com" delay={0.2} />
                <InputField icon={Lock} label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" delay={0.25} />

                <div style={{ display:"flex", justifyContent:"flex-end", animation:"fadeUp 0.4s ease-out 0.3s both" }}>
                  <button
                    type="button"
                    className="forgot-link"
                    style={{ background:"none", border:"none", cursor:"pointer", fontSize:"12px", color:"#475569", padding:0 }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {error && (
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 12px", borderRadius:"7px", background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.15)", animation:"errorIn 0.2s ease-out both" }}>
                    <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#ef4444", flexShrink:0 }} />
                    <p style={{ fontSize:"12px", color:"#f87171", margin:0 }}>{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn"
                  style={{
                    display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                    height:"46px", width:"100%", borderRadius:"8px",
                    background: loading ? "rgba(37,99,235,0.4)" : "#2563eb",
                    border:"none", color:"white", fontSize:"14px", fontWeight:500,
                    cursor: loading ? "not-allowed" : "pointer",
                    animation:"fadeUp 0.4s ease-out 0.35s both",
                    letterSpacing:"0.1px",
                    boxShadow: loading ? "none" : "0 2px 12px rgba(37,99,235,0.25)",
                    marginTop:"4px",
                  }}
                >
                  {loading
                    ? <><Loader2 size={15} style={{ animation:"spin 0.8s linear infinite" }} /><span>Verificando…</span></>
                    : <><span>Ingresar al sistema</span><ArrowRight size={14} strokeWidth={2} /></>
                  }
                </button>

              </div>
            </form>

            {/* Bottom */}
            <div style={{ marginTop:"36px", paddingTop:"20px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between", animation:"fadeUp 0.4s ease-out 0.4s both" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#10b981", boxShadow:"0 0 6px rgba(16,185,129,0.5)" }} />
                <span style={{ fontSize:"11px", color:"#334155" }}>Sistema operativo</span>
              </div>
              <span style={{ fontSize:"11px", color:"#1e293b" }}>v10.0.0</span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}