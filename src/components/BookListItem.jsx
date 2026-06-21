import "../styles/BookListItem.css";

function BookListItem({
  capa,
  titulo,
  autor,
  status
}) {
  return (
    <div className="book-list-item">

      <img
        src={capa}
        alt={titulo}
        className="book-list-cover"
      />

      <div className="book-list-info">

        <h3>{titulo}</h3>

        <p>{autor}</p>

        <span
          className={
            status === "disponivel"
              ? "status-disponivel"
              : "status-emprestado"
          }
        >
          {status === "disponivel"
            ? "Disponível"
            : "Emprestado"}
        </span>

      </div>

      <button
        className={
          status === "disponivel"
            ? "btn-emprestar"
            : "btn-devolver"
        }
      >
        {status === "disponivel"
          ? "Emprestar"
          : "Devolver"}
      </button>

    </div>
  );
}

export default BookListItem;