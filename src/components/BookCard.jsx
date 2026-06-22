import "../styles/BookCard.css";

function BookCard({
  capa,
  titulo,
  autor,
  status,
  botao,
  onAcaoClick,
  nomeEmprestimo,
  idUsuarioEmprestimo, // NOVA PROP
  idUsuarioLogado, // NOVA PROP
}) {
  // Trata o nome para exibir apenas o primeiro nome se ele existir
  const primeiroNome = nomeEmprestimo
    ? nomeEmprestimo.split(" ")[0]
    : "Usuário";

  // Descobre se o livro foi emprestado especificamente para VOCÊ
  const ehMeuEmprestimo =
    status === "emprestado" && idUsuarioEmprestimo === idUsuarioLogado;

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

      {/* Só mostra para quem está emprestado se o livro for de OUTRA pessoa */}
      {status === "emprestado" && !ehMeuEmprestimo && (
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

      {/* Só renderiza o botão se o livro estiver disponível OU se for seu para devolver */}
      {(status === "disponivel" || ehMeuEmprestimo) && (
        <button
          className={botao === "Devolver" ? "return-button" : "borrow-button"}
          onClick={onAcaoClick}
        >
          {botao}
        </button>
      )}
    </div>
  );
}

export default BookCard;
