import "../styles/Sidebar.css";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

import {
  MdDashboard,
  MdMenuBook,
  MdPeople,
  MdSwapHoriz,
  MdSettings
} from "react-icons/md";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img
          src={logo}
          alt="Logo Prometheus"
          className="logo-image"
        />
        <h2>PROMETHEUS</h2>
      </div>

      <nav className="sidebar-menu">
        <Link to="/dashboard">
          <MdDashboard />
          Dashboard
        </Link>

        <Link to="/livros">
          <MdMenuBook />
          Livros
        </Link>

        <Link to="/usuarios">
          <MdPeople />
          Usuários
        </Link>

        <Link to="/emprestimos">
          <MdSwapHoriz />
          Empréstimos
        </Link>

        <Link to="/configuracoes">
          <MdSettings />
          Configurações
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;