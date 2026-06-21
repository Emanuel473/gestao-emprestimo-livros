import "../styles/Header.css";
import { MdSearch } from "react-icons/md";

function Header({ pesquisa, setPesquisa }) {
  return (
    <div className="header">
      <div className="search-container">
        <MdSearch className="search-icon" />

        <input
          type="text"
          placeholder="Pesquisar livros..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Header;