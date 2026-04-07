import { useState } from 'react'
import './App.css'
import "./index.css";
import Rutas from './routes/rutas';

function App() {
  const [showMenu,setShowMenu] = useState()

  const mostrarmenu=()=>{
    setShowMenu(!showMenu)
  }

  return (
    <div>
      <Rutas />
    </div>
  )
}

export default App
