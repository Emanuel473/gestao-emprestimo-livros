import "../styles/Sidebar.css";
import logo from "../assets/logo.jpeg";

import {
  MdDashboard,
  MdMenuBook,
  MdPeople,
  MdSwapHoriz,
  MdSettings
} from "react-icons/md";

import { Link } from "react-router-dom";

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

        <a href="#">
          <MdPeople />
          Usuários
        </a>

        <a href="#">
          <MdSwapHoriz />
          Empréstimos
        </a>

        <a href="#">
          <MdSettings />
          Configurações
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;