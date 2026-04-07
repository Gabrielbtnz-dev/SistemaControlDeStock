import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <Menu />

      {/* CONTENIDO */}
      <div className="flex-1 min-w-0 overflow-auto p-4">
        <Outlet />
      </div>

    </div>
  );
}

export default MainLayout;