import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import "../styles/BookCard.css";

function BookCard({
  id, // Recebe o ID para permitir o redirecionamento
  capa,
  titulo,
  autor,
  status,
  botao,
  onAcaoClick,
  nomeEmprestimo,
}) {
  const navigate = useNavigate();

  const handleIrParaDetalhes = () => {
    navigate(`/livros/${id}`);
  };

  return (
    /* O CARD INTEIRO AGORA REDIRECIONA PARA OS DETALHES AO CLICAR */
    <div className="book-card" onClick={handleIrParaDetalhes}>
      <img src={capa} alt={titulo} className="book-cover" />

      <h3>{titulo}</h3>

      <p className="author">{autor}</p>

      <p
        className={`status ${
          status === "disponivel" ? "available" : "unavailable"
        }`}
      >
        {status === "disponivel" ? "Disponível" : "Indisponível"}
      </p>

      {/* SEMPRE mostra para quem está emprestado se o status for indisponível */}
      {status === "emprestado" && (
        <p className="borrowed-by">
          Emprestado para: <br />
          <strong style={{ color: "#ffffff" }}>
            {nomeEmprestimo || "Usuário"}
          </strong>
        </p>
      )}

      {/* Botão com tratamento de propagação para não abrir os detalhes */}
      <button
        className={botao === "Devolver" ? "return-button" : "borrow-button"}
        onClick={(e) => {
          e.stopPropagation(); // Impede que o clique abra a tela de detalhes
          onAcaoClick();
        }}
      >
        {botao}
      </button>
    </div>
  );
}

export default BookCard;
