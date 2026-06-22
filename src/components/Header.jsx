import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { MdSearch, MdLogout } from "react-icons/md";

function Header({ pesquisa, setPesquisa }) {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    // Busca os dados do usuário salvos no localStorage ao fazer login
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const usuarioObj = JSON.parse(usuarioSalvo);

      // Pega apenas o primeiro nome para não esticar muito o layout
      const primeiroNome = usuarioObj.nome
        ? usuarioObj.nome.split(" ")[0]
        : "Usuário";
      setNomeUsuario(primeiroNome);
    }
  }, []);

  // Função para deslogar do sistema
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // Limpa os dados da sessão
    navigate("/"); // Redireciona para a tela de Login (ou "/login" dependendo da sua rota)
  };

  return (
    <div className="header">
      {/* Lado Esquerdo: Barra de Busca */}
      <div className="search-container">
        <MdSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquisar livros..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      {/* Lado Direito: Perfil e Sair */}
      <div className="header-profile">
        <div className="user-info">
          <span className="welcome-text">Olá,</span>
          <span className="user-name">{nomeUsuario}</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          title="Sair da conta"
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );
}

export default Header;
