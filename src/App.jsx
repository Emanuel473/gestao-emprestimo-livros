import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Livros from "./pages/Livros";
import DetalhesLivro from "./pages/DetalhesLivro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/livros" element={<Livros />} />
      <Route path="/livros/:id" element={<DetalhesLivro />} />
    </Routes>
  );
}

export default App;
