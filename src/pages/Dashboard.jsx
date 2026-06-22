import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";
import "../styles/Dashboard.css";

function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  // Estados para controlar o Modal de Empréstimo Customizado
  const [modalAberto, setModalAberto] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [nomeCompletoInput, setNomeCompletoInput] = useState("");

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  async function buscarLivros() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/livros`);
      if (!resposta.ok) {
        throw new Error("Erro ao buscar os livros da API");
      }
      const dados = await resposta.json();
      setLivros(dados);
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  // Abre o modal customizado salvando qual livro foi clicado
  const abrirModalEmprestimo = (livro) => {
    setLivroSelecionado(livro);
    setNomeCompletoInput("");
    setModalAberto(true);
  };

  // FUNÇÃO: Efetiva o empréstimo usando o nome digitado no Modal
  const confirmarEmprestimoCustomizado = async (e) => {
    e.preventDefault();

    if (!nomeCompletoInput.trim()) {
      alert("Por favor, insira seu nome completo.");
      return;
    }

    try {
      // Como o registro passa a ser por nome digitado na caixa, enviamos o texto para o back-end.
      // Dica: Seu back-end precisará aceitar esse nome para vincular ou buscar o id correspondente,
      // ou se sua rota espera um ID fixo, mandamos uma simulação (aqui mandamos o payload no padrão)
      const resposta = await fetch(
        `${API_URL}/livros/${livroSelecionado.id}/emprestar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: 1, // Mantém ID padrão de fallback para conformidade do banco antigo
            nome_completo: nomeCompletoInput, // Nome digitado na caixinha estilizada
          }),
        },
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao realizar empréstimo.");
      }

      setModalAberto(false);
      buscarLivros();
    } catch (err) {
      alert(err.message);
    }
  };

  // FUNÇÃO: Qualquer pessoa agora pode devolver
  const handleDevolver = async (livro) => {
    const confirmar = window.confirm(
      `Você tem certeza que deseja devolver o livro "${livro.titulo}"?`,
    );
    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/livros/${livro.id}/devolver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: 1 }), // Envio genérico já que a trava caiu
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao realizar devolução.");
      }

      buscarLivros();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalLivros = livros.length;
  const disponiveis = livros.filter((l) => l.status === "disponivel").length;
  const emprestados = livros.filter((l) => l.status === "emprestado").length;

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <Header pesquisa={pesquisa} setPesquisa={setPesquisa} />

        <div className="stats-container">
          <StatCard titulo="Livros" valor={totalLivros.toString()} />
          <StatCard titulo="Disponíveis" valor={disponiveis.toString()} />
          <StatCard titulo="Emprestados" valor={emprestados.toString()} />
        </div>

        <h2 className="recent-title">Livros Recentes</h2>

        {carregando ? (
          <p className="loading-text">Carregando livros da biblioteca...</p>
        ) : (
          <div className="recent-books-container">
            {livrosFiltrados.map((livro) => (
              <BookCard
                key={livro.id}
                capa={livro.foto_url}
                titulo={livro.titulo}
                autor={livro.autor || "Autor desconhecido"}
                status={livro.status}
                botao={livro.status === "disponivel" ? "Emprestar" : "Devolver"}
                nomeEmprestimo={livro.nome_emprestimo}
                onAcaoClick={
                  livro.status === "disponivel"
                    ? () => abrirModalEmprestimo(livro)
                    : () => handleDevolver(livro)
                }
              />
            ))}

            {livrosFiltrados.length === 0 && (
              <p style={{ color: "#fff", marginTop: "20px" }}>
                Nenhum livro encontrado.
              </p>
            )}
          </div>
        )}
      </main>

      {/* MODAL CUSTOMIZADO E ESTILIZADO DE EMPRÉSTIMO */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Confirmar Empréstimo</h3>
            <p className="modal-subtitle">
              Você está pegando: <strong>{livroSelecionado?.titulo}</strong>
            </p>

            <form onSubmit={confirmarEmprestimoCustomizado}>
              <label>Digite seu nome completo:</label>
              <input
                className="modal-input"
                type="text"
                required
                value={nomeCompletoInput}
                onChange={(e) => setNomeCompletoInput(e.target.value)}
                placeholder="Nome completo"
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

export default Dashboard;
