import React from "react";
import "../styles/Emprestimos.css";
import logo from "../assets/logo.jpeg";
import {
  LayoutDashboard,
  Library,
  User,
  BookText,
  Settings,
  ArrowLeft,
  Search,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Livros", icon: Library, active: false },
  { label: "Usuários", icon: User, active: false },
  { label: "Empréstimos", icon: BookText, active: true },
  { label: "Configurações", icon: Settings, active: false },
];

const loans = [
  {
    book: "1984",
    user: "João Silva",
    pickup: "05/06/2026",
    due: "12/06/2026",
    status: "Em andamento",
    statusClass: "status--progress",
  },
  {
    book: "Dom Casmurro",
    user: "Maria Gomes",
    pickup: "01/06/2026",
    due: "08/06/2026",
    status: "Devolvido",
    statusClass: "status--returned",
  },
  {
    book: "O Ateneu",
    user: "Carlos Lima",
    pickup: "28/05/2026",
    due: "04/06/2026",
    status: "Atrasado",
    statusClass: "status--late",
  },
];

export default function Emprestimos() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="Logo" />
          <span className="brand-name">PROMETHEUS</span>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <a
              href="#"
              key={item.label}
              className={`nav-item ${item.active ? "nav-item--active" : ""}`}
            >
              <item.icon className="nav-icon" size={18} />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Pesquisar livros..."
          />
        </div>

        <div className="page-title">
          <ArrowLeft size={18} className="back-arrow" />
          <h1>Empréstimos Ativos</h1>
        </div>

        <div className="table-wrapper">
          <table className="loans-table">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Usuário</th>
                <th>Retirada</th>
                <th>Devolução</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.book}>
                  <td>{loan.book}</td>
                  <td>{loan.user}</td>
                  <td>{loan.pickup}</td>
                  <td>{loan.due}</td>
                  <td>
                    <span className={`status ${loan.statusClass}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
