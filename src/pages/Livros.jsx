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

  const API_URL = "https://api-emprestimo-livros.onrender.com";

  useEffect(() => {
    async function buscarLivros() {
      try {
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

            buscarLivros();
        }, []);

        const livrosFiltrados = livros.filter((livro) =>
        livro.titulo
            .toLowerCase()
            .includes(pesquisa.toLowerCase())
        );

  return (
    <div className="livros-container">
      <Sidebar />

      <main className="livros-content">
        <Header
            pesquisa={pesquisa}
            setPesquisa={setPesquisa}
         />

         <h2 className="livros-title">
            <Link
                to="/dashboard"
                className="back-button"
            >
                ←
            </Link>

            Livros
         </h2>

        {carregando ? (
          <p>Carregando livros...</p>
        ) : (
          <div className="livros-list">
            {livrosFiltrados.map((livro) => (
              <BookListItem
                key={livro.id}
                capa={livro.foto_url}
                titulo={livro.titulo}
                autor={livro.autor}
                status={livro.status}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Livros;