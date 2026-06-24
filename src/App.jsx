import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Livros from "./pages/Livros";
import Emprestimos from "./pages/Emprestimos";
import Configuracoes from "./pages/Configuracoes";
import Usuarios from "./pages/Usuarios";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/livros" element={<Livros />} />
      <Route path="/emprestimos" element={<Emprestimos />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  );
}

export default App;