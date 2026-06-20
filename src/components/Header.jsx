import "../styles/Header.css";
import { MdSearch } from "react-icons/md";

function Header() {
  return (
    <div className="header">
      <div className="search-container">
        <MdSearch className="search-icon" />

        <input
          type="text"
          placeholder="Pesquisar livros..."
        />
      </div>
    </div>
  );
}

export default Header;