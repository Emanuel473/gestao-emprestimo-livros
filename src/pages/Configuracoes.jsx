import React, { useState } from "react";
import "../styles/Configuracoes.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ArrowLeft } from "lucide-react";

export default function Configuracoes() {
  const [pesquisa, setPesquisa] = useState("");
  const [nome, setNome] = useState("Administrador");
  const [email, setEmail] = useState("admin@prometheus.com");
  const [novaSenha, setNovaSenha] = useState("");

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log({ nome, email, novaSenha });
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Header pesquisa={pesquisa} setPesquisa={setPesquisa} />

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