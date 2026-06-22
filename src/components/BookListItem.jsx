import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import "../styles/BookListItem.css";

function BookListItem({
  id, // <-- Recebe o ID vindo do loop do pai
  capa,
  titulo,
  autor,
  status,
  botao,
  onAcaoClick,
  nomeEmprestimo,
}) {
  const navigate = useNavigate();

  // Função disparada ao clicar na imagem da capa
  const handleIrParaDetalhes = () => {
    // Altere a rota abaixo caso a URL configurada no seu App.jsx seja diferente (ex: /detalhes/:id)
    navigate(`/livros/${id}`);
  };

  return (
    <div className="book-list-item">
      {/* Adicionado o evento onClick e um estilo de cursor para indicar que é clicável */}
      <img
        src={capa}
        alt={titulo}
        className="book-list-cover"
        onClick={handleIrParaDetalhes}
        style={{ cursor: "pointer" }}
        title="Clique para ver os detalhes"
      />

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

        {/* Mostra o nome completo de quem pegou o livro ao lado do status */}
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

      {/* Botão conectado com os manipuladores e estados do pai */}
      <button
        className={status === "disponivel" ? "btn-emprestar" : "btn-devolver"}
        onClick={onAcaoClick}
      >
        {botao}
      </button>
    </div>
  );
}

export default BookListItem;
