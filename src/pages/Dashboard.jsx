import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";
import "../styles/Dashboard.css";

function Dashboard() {
  // Estado para armazenar os livros vindos da API
  const [livros, setLivros] = useState([]);
  // Estado para controlar o carregamento
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  // Pega o ID do usuário que está logado no navegador para passar para os cards
  const usuarioLogado = localStorage.getItem("usuario");
  const idUsuarioLogado = usuarioLogado ? JSON.parse(usuarioLogado).id : null;

  // Função isolada para buscar livros
  async function buscarLivros() {
    try {
      setCarregando(true);
      const resposta = await fetch(`${API_URL}/livros`);
      if (!resposta.ok) {
        throw new Error("Erro ao buscar os livros da API");
      }
      const dados = await resposta.json();
      setLivros(dados); // Salva os livros no estado
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    } finally {
      setCarregando(false); // Desativa o indicador de carregando
    }
  }

  useEffect(() => {
    buscarLivros();
  }, []); // Executa apenas ao carregar o componente

  // FUNÇÃO: Faz a requisição PUT para pegar emprestado
  const handleEmprestar = async (livro) => {
    if (!idUsuarioLogado) {
      alert("Sessão inválida ou expirada. Por favor, refaça o login.");
      return;
    }

    // Caixinha de confirmação antes de efetivar
    const confirmar = window.confirm(
      `Você tem certeza que deseja pegar o livro "${livro.titulo}" emprestado?`,
    );
    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/livros/${livro.id}/emprestar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_id: idUsuarioLogado }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao realizar empréstimo.");
      }

      // Atualiza a lista e os contadores na tela dinamicamente
      buscarLivros();
    } catch (err) {
      alert(err.message);
    }
  };

  // FUNÇÃO: Faz a requisição PUT para devolver o livro
  const handleDevolver = async (livro) => {
    if (!idUsuarioLogado) {
      alert("Sessão inválida ou expirada. Por favor, refaça o login.");
      return;
    }

    // TRAVA: Verifica se quem está logado é o mesmo que pegou o livro
    if (
      livro.usuario_emprestimo &&
      livro.usuario_emprestimo !== idUsuarioLogado
    ) {
      alert(
        "Apenas o usuário que pegou este livro emprestado pode realizar a devolução.",
      );
      return;
    }

    // Caixinha de confirmação antes de efetivar
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
        body: JSON.stringify({ usuario_id: idUsuarioLogado }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao realizar devolução.");
      }

      // Atualiza a lista e os contadores na tela dinamicamente
      buscarLivros();
    } catch (err) {
      alert(err.message);
    }
  };

  // Funções para calcular os valores dos cards dinamicamente baseados no banco
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
                idUsuarioEmprestimo={
                  livro.usuario_emprestimo
                } /* Mapeia ID do banco */
                idUsuarioLogado={idUsuarioLogado} /* Mapeia ID da sessão */
                onAcaoClick={
                  livro.status === "disponivel"
                    ? () => handleEmprestar(livro)
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
    </div>
  );
}

export default Dashboard;
