import "../styles/BookCard.css";

function BookCard({
  capa,
  titulo,
  autor,
  status,
  botao,
  onAcaoClick,
  nomeEmprestimo,
}) {
  // Trata o nome para exibir apenas o primeiro nome se ele existir
  const primeiroNome = nomeEmprestimo ? nomeEmprestimo : "Usuário";

  return (
    <div className="book-card">
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
        <p
          className="borrowed-by"
          style={{
            color: "#8da2bb",
            fontSize: "0.85rem",
            marginBottom: "12px",
            fontStyle: "italic",
          }}
        >
          Emprestado para:{" "}
          <strong style={{ color: "#ffffff" }}>{primeiroNome}</strong>
        </p>
      )}

      {/* Sempre renderiza o botão correspondente (Emprestar ou Devolver) */}
      <button
        className={botao === "Devolver" ? "return-button" : "borrow-button"}
        onClick={onAcaoClick}
      >
        {botao}
      </button>
    </div>
  );
}

export default BookCard;
