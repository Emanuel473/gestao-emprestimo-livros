import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BookListItem from "../components/BookListItem";
import { Link } from "react-router-dom";
import "../styles/Livros.css";

function Livros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  // Estados para controlar o Modal de Empréstimo Customizado
  const [modalAberto, setModalAberto] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [nomeCompletoInput, setNomeCompletoInput] = useState("");

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  // Função isolada para buscar livros
  async function buscarLivros() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/livros`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar livros");
      }

      const dados = await resposta.json();
      setLivros(dados);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  // FUNÇÃO: Abre o modal e salva qual linha foi clicada
  const abrirModalEmprestimo = (livro) => {
    setLivroSelecionado(livro);
    setNomeCompletoInput("");
    setModalAberto(true);
  };

  // FUNÇÃO: Confirma e envia o nome digitado para a API
  const confirmarEmprestimo = async (e) => {
    e.preventDefault();

    if (!nomeCompletoInput.trim()) {
      alert("Por favor, insira seu nome completo.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/livros/${livroSelecionado.id}/emprestar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: 1,
            nome_completo: nomeCompletoInput,
          }),
        },
      );

      if (!response.ok) {
        const dados = await response.json();
        throw new Error(dados.error || "Erro ao realizar empréstimo.");
      }

      setModalAberto(false);
      buscarLivros(); // Recarrega os dados dinamicamente na lista
    } catch (err) {
      alert(err.message);
    }
  };

  // FUNÇÃO: Processa a devolução livre
  const handleDevolver = async (livro) => {
    const confirmar = window.confirm(
      `Você tem certeza que deseja devolver o livro "${livro.titulo}"?`,
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/livros/${livro.id}/devolver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: 1 }),
      });

      if (!response.ok) {
        const dados = await response.json();
        throw new Error(dados.error || "Erro ao realizar devolução.");
      }

      buscarLivros(); // Recarrega a lista dinamicamente
    } catch (err) {
      alert(err.message);
    }
  };

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <div className="livros-container">
      <Sidebar />

      <main className="livros-content">
        <Header pesquisa={pesquisa} setPesquisa={setPesquisa} />

        <h2 className="livros-title">
          <Link to="/dashboard" className="back-button">
            ←
          </Link>
          Livros
        </h2>

        {carregando ? (
          <p
            style={{
              color: "#fff",
              marginLeft: "calc((100% - 1000px) / 2)",
              marginTop: "20px",
            }}
          >
            Carregando livros...
          </p>
        ) : (
          <div className="livros-list">
            {livrosFiltrados.map((livro) => (
              <BookListItem
                key={livro.id}
                id={livro.id} // <-- INCLUA ESSA LINHA AQUI
                capa={livro.foto_url}
                titulo={livro.titulo}
                autor={livro.autor || "Autor desconhecido"}
                status={livro.status}
                nomeEmprestimo={livro.nome_emprestimo}
                botao={livro.status === "disponivel" ? "Emprestar" : "Devolver"}
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

export default Livros;
