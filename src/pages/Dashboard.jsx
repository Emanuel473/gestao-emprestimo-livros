import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";
import "../styles/Dashboard.css";

function Dashboard() {
  // Estado para armazenar os livros vindos da API
  const [livros, setLivros] = useState([]);
  // Estado para controlar o carregamento (opcional, mas muito bom para UX)
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  useEffect(() => {
    // Função assíncrona para buscar os dados da API
    async function buscarLivros() {
      try {
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

    buscarLivros();
  }, []); // Array vazio significa que roda apenas uma vez quando a tela carrega

  // Funções para calcular os valores dos cards dinamicamente baseados no banco
  const totalLivros = livros.length;
  const disponiveis = livros.filter((l) => l.status === "disponivel").length;
  const emprestados = livros.filter((l) => l.status === "emprestado").length;

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <Header
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
        />

        {/* Agora os cards exibem os números reais vindos do banco de dados */}
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
                key={livro.id} // O React precisa de uma chave única para listas
                capa={livro.foto_url} // Usa o link do Supabase Storage
                titulo={livro.titulo}
                autor={livro.autor || "Autor desconhecido"}
                status={livro.status}
                botao={livro.status === "disponivel" ? "Emprestar" : "Devolver"}
              />
            ))}

            {livros.length === 0 && (
              <p>Nenhum livro encontrado no banco de dados.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
