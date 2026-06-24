import { useNavigate } from "react-router-dom";
import "../styles/BookListItem.css";

function BookListItem({
  id,
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
    /* O CARD INTEIRO AGORA REDIRECIONA PARA OS DETALHES */
    <div className="book-list-item" onClick={handleIrParaDetalhes}>
      <img src={capa} alt={titulo} className="book-list-cover" />

      <div className="book-list-info">
        <h3>{titulo}</h3>
        <p>{autor}</p>

        <span
          className={
            status === "disponivel" ? "status-disponivel" : "status-emprestado"
          }
        >
          {status === "disponivel" ? "Disponível" : "Emprestado"}
        </span>

        {status === "emprestado" && nomeEmprestimo && (
          <span
            className="borrowed-user-text"
            style={{
              color: "#8da2bb",
              fontSize: "0.85rem",
              marginLeft: "15px",
              fontStyle: "italic",
            }}
          >
            (por: <strong style={{ color: "#ffffff" }}>{nomeEmprestimo}</strong>
            )
          </span>
        )}
      </div>

      <button
        className={status === "disponivel" ? "btn-emprestar" : "btn-devolver"}
        onClick={(e) => {
          e.stopPropagation(); // <-- IMPEDE QUE O CLIQUE NO BOTÃO ABRA A TELA DE DETALHES
          onAcaoClick();
        }}
      >
        {botao}
      </button>
    </div>
  );
}

export default BookListItem;
