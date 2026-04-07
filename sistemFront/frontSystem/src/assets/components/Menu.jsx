import { useState } from "react";
import { Users, Menu as MenuIcon, Home } from "lucide-react";
import { Link } from "react-router-dom";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white p-4 transition-all ${open ? "w-50" : "w-15"}`}>

      <div className="flex justify-between items-center mb-6">
        {open && <h1 className="font-bold text-lg">Menu</h1>}

        <MenuIcon
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
{open &&
      <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
        <Home/>
         <span>Home</span>
      
      </Link>}
{open &&
      <Link
        to="/entity"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
      >
        <Users />
         <span>Clientes</span>
      </Link>}

    </div>
  );
}

export default Menu;