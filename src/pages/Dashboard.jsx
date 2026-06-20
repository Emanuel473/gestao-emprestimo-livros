import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import BookCard from "../components/BookCard";
import "../styles/Dashboard.css";
import domCasmurro from "../assets/domcasmurro.jpg";
import livro1984 from "../assets/1984.jpg";
import ateneu from "../assets/O-Ateneu.jpg";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <Header />

        <div className="stats-container">
          <StatCard titulo="Livros" valor="1240" />
          <StatCard titulo="Disponíveis" valor="320" />
          <StatCard titulo="Emprestados" valor="89" />
        </div>

        <h2 className="recent-title">
          Livros Recentes
        </h2>

        <div className="recent-books-container">

          <BookCard
            capa={domCasmurro}
            titulo="Dom Casmurro"
            autor="Machado de Assis"
            status="Disponível"
            botao="Emprestar"
          />

          <BookCard
            capa={livro1984}
            titulo="1984"
            autor="George Orwell"
            status="Indisponível"
            botao="Devolver"
          />

          <BookCard
            capa={ateneu}
            titulo="O Ateneu"
            autor="Raul Pompeia"
            status="Indisponível"
            botao="Devolver"
          />

        </div>
      </main>
    </div>
  );
}

export default Dashboard;