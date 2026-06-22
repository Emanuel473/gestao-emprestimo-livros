import React from "react";
import "../styles/DetalhesLivro.css";
import capaLivro from "../assets/1984.jpg";
import logo from "../assets/logo.jpeg";
import {
  LayoutDashboard,
  Library,
  User,
  BookText,
  Settings,
  ArrowLeft,
  BookOpenCheck,
  Undo2,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Livros", icon: Library, active: true },
  { label: "Usuários", icon: User, active: false },
  { label: "Empréstimos", icon: BookText, active: false },
  { label: "Configurações", icon: Settings, active: false },
];

export default function DetalhesLivro() {
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
        <button className="back-link">
          <ArrowLeft size={16} /> Voltar para livros
        </button>

        <div className="content-grid">
          {/* Capa do livro */}
          <div className="cover-wrapper">
            <img
              className="book-cover"
              src={capaLivro}
              alt="Capa do livro 1984"
            />
          </div>

          {/* Informações do livro */}
          <div className="book-info">
            <span className="badge-available">
              <span className="badge-dot" />
              Disponível
            </span>

            <h1 className="book-title">1984</h1>
            <h2 className="book-author">George Orwell</h2>

            <dl className="meta-list">
              <div className="meta-row">
                <dt>Editora:</dt>
                <dd>Companhia das Letras</dd>
              </div>
              <div className="meta-row">
                <dt>Ano:</dt>
                <dd>1949</dd>
              </div>
              <div className="meta-row">
                <dt>Categoria:</dt>
                <dd>Ficção Científica</dd>
              </div>
              <div className="meta-row">
                <dt>ISBN:</dt>
                <dd>978-85-359-0277-1</dd>
              </div>
            </dl>

            <hr className="divider" />

            <section className="description">
              <h3>Descrição</h3>
              <p>
                Winston, herói de 1984, último romance de George Orwell, vive
                aprisionado na engrenagem totalitária de uma sociedade
                completamente dominada pelo Estado, onde tudo é feito
                coletivamente, mas cada qual vive sozinho. Ninguém escapa à
                vigilância do Grande Irmão, a mais famosa personificação
                literária de um poder cínico e cruel ao infinito, além de vazio
                de sentido histórico. De fato, a ideologia do Partido dominante
                em Oceânia não visa nada de coisa alguma para ninguém, no
                presente ou no futuro. O'Brien, hierarca do Partido, é quem
                explica a Winston que "só nos interessa o poder em si. Nem
                riqueza, nem luxo, nem vida longa, nem felicidade: só o poder
                pelo poder, poder puro".
              </p>
            </section>

            <div className="actions">
              <button className="btn btn--primary">
                <span className="btn-icon">📘</span> Emprestar
              </button>
              <button className="btn btn--danger">
                <span className="btn-icon">📕</span> Devolver
              </button>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <section className="additional-info">
          <h3>Informações adicionais</h3>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Idioma:</span>
              <span className="info-value">Português (pt-BR)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Dimensões:</span>
              <span className="info-value">14 x 21 cm</span>
            </div>
            <div className="info-row">
              <span className="info-label">Encadernação:</span>
              <span className="info-value">Capa Comum</span>
            </div>
            <div className="info-row">
              <span className="info-label">Peso:</span>
              <span className="info-value">0,450 kg</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
