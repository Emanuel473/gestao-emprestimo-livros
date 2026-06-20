import "../styles/BookCard.css";

function BookCard({ capa, titulo, autor, status, botao }) {
  return (
    <div className="book-card">
      <img
        src={capa}
        alt={titulo}
        className="book-cover"
      />

      <h3>{titulo}</h3>

      <p className="author">
        {autor}
      </p>

       <p
          className={`status ${
            status === "disponivel"
              ? "available"
              : "unavailable"
          }`}
        >
          {status === "disponivel"
            ? "Disponível"
            : "Indisponível"}
        </p>

    <button
        className={
            botao === "Devolver"
            ? "return-button"
            : "borrow-button"
        }
        >
        {botao}
        </button>
    </div>
  );
}

export default BookCard;