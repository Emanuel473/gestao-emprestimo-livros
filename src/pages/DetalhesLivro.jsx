import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/DetalhesLivro.css";
import logo from "../assets/logo.jpeg";
import { ArrowLeft } from "lucide-react";



export default function DetalhesLivro() {
  const { id } = useParams(); // Captura dinamicamente o ID do livro pela URL da rota
  const navigate = useNavigate();

  // Estados principais do componente
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Estados para controlar o Modal de Empréstimo Customizado
  const [modalAberto, setModalAberto] = useState(false);
  const [nomeCompletoInput, setNomeCompletoInput] = useState("");

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  // Função assíncrona para buscar os detalhes reais do livro
  async function buscarDetalhesLivro() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/livros/${id}`);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os detalhes deste livro.");
      }

      const dados = await resposta.json();
      setLivro(dados);
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert(erro.message);
      navigate("/livros"); // Redireciona de volta em caso de falha crítica
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarDetalhesLivro();
  }, [id]);

  // FUNÇÃO: Abre o modal de empréstimo
  const handleAbrirModal = () => {
    setNomeCompletoInput("");
    setModalAberto(true);
  };

  // FUNÇÃO: Confirma e processa o empréstimo pelo nome digitado
  const confirmarEmprestimo = async (e) => {
    e.preventDefault();

    if (!nomeCompletoInput.trim()) {
      alert("Por favor, insira seu nome completo.");
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/livros/${id}/emprestar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_completo: nomeCompletoInput,
        }),
      });

      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.error || "Erro ao realizar empréstimo.");
      }

      setModalAberto(false);
      buscarDetalhesLivro(); // Recarrega os dados dinamicamente na tela
    } catch (err) {
      alert(err.message);
    }
  };

  // FUNÇÃO: Processa a devolução livre
  const handleDevolver = async () => {
    const confirmar = window.confirm(
      `Você tem certeza que deseja devolver o livro "${livro?.titulo}"?`,
    );
    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/livros/${id}/devolver`, {
        method: "PUT",
      });

      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.error || "Erro ao realizar devolução.");
      }

      buscarDetalhesLivro(); // Recarrega os dados atualizados do livro
    } catch (err) {
      alert(err.message);
    }
  };

  if (carregando) {
    return (
      <div
        className="app"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <p style={{ fontSize: "1.2rem", color: "#8da2bb" }}>
          Carregando dados do livro...
        </p>
      </div>
    );
  }

  const isDisponivel = livro?.status === "disponivel";

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="main">
        {/* Evento de clique configurado para usar o histórico do React Router */}
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="content-grid">
          {/* Capa do livro dinâmica vinda do Supabase */}
          <div className="cover-wrapper">
            <img
              className="book-cover"
              src={livro?.foto_url || logo}
              alt={`Capa do livro ${livro?.titulo}`}
            />
          </div>

          {/* Informações dinâmicas do livro */}
          <div className="book-info">
            <span
              className={isDisponivel ? "badge-available" : "badge-unavailable"}
            >
              <span className="badge-dot" />
              {isDisponivel ? "Disponível" : "Indisponível"}
            </span>

            <h1 className="book-title">{livro?.titulo}</h1>
            <h2 className="book-author">
              {livro?.autor || "Autor desconhecido"}
            </h2>

            {/* Renderiza o nome completo do leitor caso esteja emprestado */}
            {!isDisponivel && livro?.nome_emprestimo && (
              <p
                className="borrowed-by-info"
                style={{
                  color: "#8da2bb",
                  fontStyle: "italic",
                  marginBottom: "16px",
                  fontSize: "0.95rem",
                }}
              >
                Emprestado para:{" "}
                <strong style={{ color: "#ffffff" }}>
                  {livro.nome_emprestimo}
                </strong>
              </p>
            )}

            <dl className="meta-list">
              <div className="meta-row">
                <dt>Editora:</dt>
                <dd>{livro?.editora}</dd>
              </div>
              <div className="meta-row">
                <dt>Ano:</dt>
                <dd>{livro?.ano}</dd>
              </div>
              <div className="meta-row">
                <dt>Categoria:</dt>
                <dd>{livro?.categoria || "Não informada"}</dd>
              </div>
              <div className="meta-row">
                <dt>ISBN:</dt>
                <dd>{livro?.isbn || "N/A"}</dd>
              </div>
            </dl>

            <hr className="divider" />

            <section className="description">
              <h3>Descrição</h3>
              <p>{livro?.descricao}</p>
            </section>

            {/* Ações dinâmicas baseadas no status do livro */}
            <div className="actions">
              {isDisponivel ? (
                <button className="btn btn--primary" onClick={handleAbrirModal}>
                  <span className="btn-icon">📘</span> Emprestar
                </button>
              ) : (
                <button className="btn btn--danger" onClick={handleDevolver}>
                  <span className="btn-icon">📕</span> Devolver
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Informações adicionais do livro */}
        <section className="additional-info">
          <h3>Informações adicionais</h3>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Idioma:</span>
              <span className="info-value">
                {livro?.idioma || "Não informado"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Dimensões:</span>
              <span className="info-value">
                {livro?.dimensao || "Não informado"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Encadernação:</span>
              <span className="info-value">
                {livro?.encadernacao || "Não informado"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Peso:</span>
              <span className="info-value">
                {livro?.peso || "Não informado"}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL CUSTOMIZADO E ESTILIZADO DE EMPRÉSTIMO */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Confirmar Empréstimo</h3>
            <p className="modal-subtitle">
              Você está pegando: <strong>{livro?.titulo}</strong>
            </p>

            <form onSubmit={confirmarEmprestimo}>
              <label>Digite seu nome completo:</label>
              <input
                className="modal-input"
                type="text"
                required
                value={nomeCompletoInput}
                onChange={(e) => setNomeCompletoInput(e.target.value)}
                placeholder="Ex: Leonardo Silva"
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="modal-confirm-btn">
                  Confirmar Empréstimo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
