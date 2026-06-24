import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Configuracoes.css";
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
  { label: "Dashboard", icon: LayoutDashboard, active: false, path: "/dashboard" },
  { label: "Livros", icon: Library, active: false, path: "/livros" },
  { label: "Usuários", icon: User, active: false, path: "#" },
  { label: "Empréstimos", icon: BookText, active: false, path: "#" },
  { label: "Configurações", icon: Settings, active: true, path: "/configuracoes" },
];

export default function Configuracoes() {
  const [nome, setNome] = useState("Administrador");
  const [email, setEmail] = useState("admin@prometheus.com");
  const [novaSenha, setNovaSenha] = useState("");

  const handleSalvar = (e) => {
    e.preventDefault();
    // TODO: conectar com a API real para salvar as alterações
    console.log({ nome, email, novaSenha });
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="Logo Prometheus" />
          <span className="brand-name">PROMETHEUS</span>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.label}
              className={`nav-item ${item.active ? "nav-item--active" : ""}`}
            >
              <item.icon className="nav-icon" size={18} />
              {item.label}
            </Link>
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
          <h1>Configurações</h1>
        </div>

        <div className="settings-wrapper">
          <form className="settings-card" onSubmit={handleSalvar}>
            <h2 className="settings-title">Dados do Usuário</h2>

            <div className="field-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="novaSenha">Nova Senha</label>
              <input
                id="novaSenha"
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="save-btn">
              Salvar Alterações
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
