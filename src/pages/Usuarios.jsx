import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Usuarios.css";
import {
  ArrowLeft,
  Users,
  Search,
  Plus,
  Bell,
  User,
  ChevronDown,
  BookOpen,
  Clock,
  UserPlus,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ===================== Configuração =====================

const API_BASE_URL = "/api";
const ITENS_POR_PAGINA = 5;


const STATS_CONFIG = [
  { key: "totalUsuarios", label: "Total de usuários", icon: Users, iconClass: "stat-icon--slate" },
  { key: "livrosEmprestados", label: "Livros emprestados", icon: BookOpen, iconClass: "stat-icon--green" },
  { key: "devolucoesPendentes", label: "Devoluções pendentes", icon: Clock, iconClass: "stat-icon--amber" },
  { key: "novosCadastros", label: "Novos cadastros", icon: UserPlus, iconClass: "stat-icon--purple" },
];


const CORES_AVATAR = [
  "avatar--blue",
  "avatar--purple",
  "avatar--teal",
  "avatar--brown",
  "avatar--rose",
  "avatar--green",
];

// ===================== Helpers =====================

// "Elisa Oliveira" -> "EO"
function getIniciais(nome = "") {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}


function getCorAvatar(identificador = "") {
  const texto = String(identificador);
  let soma = 0;
  for (let i = 0; i < texto.length; i++) soma += texto.charCodeAt(i);
  return CORES_AVATAR[soma % CORES_AVATAR.length];
}


function mapUsuarioDaApi(usuarioApi) {
  return {
    matricula: usuarioApi.matricula,
    nome: usuarioApi.nome,
    email: usuarioApi.email,
    livrosEmprestados: usuarioApi.livrosEmprestados ?? usuarioApi.livros_emprestados ?? 0,
  };
}

function mapEstatisticasDaApi(estatisticasApi = {}) {
  return {
    totalUsuarios: estatisticasApi.totalUsuarios ?? 0,
    livrosEmprestados: estatisticasApi.livrosEmprestados ?? 0,
    devolucoesPendentes: estatisticasApi.devolucoesPendentes ?? 0,
    novosCadastros: estatisticasApi.novosCadastros ?? 0,
  };
}


function getPaginasVisiveis(paginaAtual, totalPaginas) {
  if (totalPaginas <= 1) return [1];

  const manterSempre = new Set([1, 2, 3, totalPaginas]);
  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    if (manterSempre.has(i) || Math.abs(i - paginaAtual) <= 1) {
      paginas.push(i);
    }
  }

  const resultado = [];
  for (let i = 0; i < paginas.length; i++) {
    if (i > 0 && paginas[i] - paginas[i - 1] > 1) resultado.push("...");
    resultado.push(paginas[i]);
  }
  return resultado;
}

export default function Usuarios() {
  const navigate = useNavigate();

  
  const [buscaInput, setBuscaInput] = useState("");
  
  const [busca, setBusca] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [usuarios, setUsuarios] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);
  const [erroUsuarios, setErroUsuarios] = useState(null);

  const [estatisticas, setEstatisticas] = useState(null);
  const [carregandoEstatisticas, setCarregandoEstatisticas] = useState(true);

  
  const [recarregar, setRecarregar] = useState(0);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusca(buscaInput);
      setPaginaAtual(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [buscaInput]);

  
  useEffect(() => {
    const controller = new AbortController();

    async function carregarUsuarios() {
      setCarregandoUsuarios(true);
      setErroUsuarios(null);
      try {
        
        const params = new URLSearchParams({
          pagina: paginaAtual,
          porPagina: ITENS_POR_PAGINA,
          busca,
        });
        const resposta = await fetch(`${API_BASE_URL}/usuarios?${params}`, {
          signal: controller.signal,
        });
        if (!resposta.ok) throw new Error("Falha ao buscar usuários");

        const dados = await resposta.json();
        setUsuarios((dados.usuarios ?? []).map(mapUsuarioDaApi));
        setTotalUsuarios(dados.totalUsuarios ?? 0);
        setTotalPaginas(dados.totalPaginas ?? 1);
      } catch (erro) {
        if (erro.name !== "AbortError") {
          setErroUsuarios("Não foi possível carregar os usuários.");
        }
      } finally {
        setCarregandoUsuarios(false);
      }
    }

    carregarUsuarios();
    return () => controller.abort();
  }, [paginaAtual, busca, recarregar]);

  // Busca os números dos cards do topo (uma vez, e quando "recarregar" mudar)
  useEffect(() => {
    const controller = new AbortController();

    async function carregarEstatisticas() {
      setCarregandoEstatisticas(true);
      try {
        // TODO: ajustar a rota conforme a API real
        const resposta = await fetch(`${API_BASE_URL}/usuarios/estatisticas`, {
          signal: controller.signal,
        });
        if (!resposta.ok) throw new Error("Falha ao buscar estatísticas");

        const dados = await resposta.json();
        setEstatisticas(mapEstatisticasDaApi(dados));
      } catch (erro) {
        if (erro.name !== "AbortError") {
          setEstatisticas(null);
        }
      } finally {
        setCarregandoEstatisticas(false);
      }
    }

    carregarEstatisticas();
    return () => controller.abort();
  }, [recarregar]);

  const handleNovoUsuario = () => {
    
    console.log("Novo usuário");
  };

  const handleVerUsuario = (usuario) => {
    
    console.log("Ver usuário:", usuario);
  };

  const irParaPagina = (pagina) => {
    if (pagina < 1 || pagina > totalPaginas || pagina === paginaAtual) return;
    setPaginaAtual(pagina);
  };

  const inicio = totalUsuarios === 0 ? 0 : (paginaAtual - 1) * ITENS_POR_PAGINA + 1;
  const fim = totalUsuarios === 0 ? 0 : inicio + usuarios.length - 1;
  const paginasVisiveis = getPaginasVisiveis(paginaAtual, totalPaginas);

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="page-title">
            <button
              type="button"
              className="back-arrow"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
            >
              <ArrowLeft size={22} />
            </button>
            <Users size={22} className="title-icon" />
            <div>
              <h1>Usuários</h1>
              <p className="page-subtitle">Gerencie os usuários do sistema</p>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-btn" type="button" aria-label="Notificações">
              <Bell size={20} />
            </button>
            <button className="avatar-btn" type="button" aria-label="Perfil">
              <User size={18} />
            </button>
            <ChevronDown size={16} className="chevron-icon" />
          </div>
        </div>

        {/* Cards*/}
        <div className="stats-grid">
          {STATS_CONFIG.map((stat) => (
            <div className="stat-card" key={stat.key}>
              <div className={`stat-icon ${stat.iconClass}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">
                  {carregandoEstatisticas ? "--" : estatisticas?.[stat.key] ?? 0}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Busca + Novo usuário */}
        <div className="actions-row">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome, e-mail ou matrícula..."
              value={buscaInput}
              onChange={(e) => setBuscaInput(e.target.value)}
            />
          </div>

          <button className="new-user-btn" type="button" onClick={handleNovoUsuario}>
            <Plus size={18} />
            Novo Usuário
          </button>
        </div>

        {/* Tabela de usuários */}
        <div className="table-card">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>E-mail</th>
                <th className="col-center">Livros emprestados</th>
                <th className="col-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {carregandoUsuarios && (
                <tr>
                  <td colSpan={5} className="table-message">
                    Carregando usuários...
                  </td>
                </tr>
              )}

              {!carregandoUsuarios && erroUsuarios && (
                <tr>
                  <td colSpan={5} className="table-message table-message--erro">
                    {erroUsuarios}{" "}
                    <button
                      className="retry-btn"
                      type="button"
                      onClick={() => setRecarregar((n) => n + 1)}
                    >
                      Tentar novamente
                    </button>
                  </td>
                </tr>
              )}

              {!carregandoUsuarios && !erroUsuarios && usuarios.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-message">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}

              {!carregandoUsuarios &&
                !erroUsuarios &&
                usuarios.map((usuario) => (
                  <tr key={usuario.matricula}>
                    <td>
                      <div className="user-cell">
                        <span className={`avatar ${getCorAvatar(usuario.matricula || usuario.nome)}`}>
                          {getIniciais(usuario.nome)}
                        </span>
                        {usuario.nome}
                      </div>
                    </td>
                    <td>{usuario.matricula}</td>
                    <td>{usuario.email}</td>
                    <td className="col-center">{usuario.livrosEmprestados}</td>
                    <td className="col-center">
                      <button
                        className="ver-btn"
                        type="button"
                        onClick={() => handleVerUsuario(usuario)}
                      >
                        <Eye size={14} />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span className="results-info">
              {totalUsuarios === 0
                ? "Nenhum usuário encontrado"
                : `Mostrando ${inicio} a ${fim} de ${totalUsuarios} usuários`}
            </span>

            <div className="pagination">
              <button
                className="page-nav-btn"
                type="button"
                aria-label="Página anterior"
                onClick={() => irParaPagina(paginaAtual - 1)}
                disabled={paginaAtual <= 1}
              >
                <ChevronLeft size={16} />
              </button>

              {paginasVisiveis.map((pagina, index) =>
                pagina === "..." ? (
                  <span className="page-dots" key={`dots-${index}`}>
                    ...
                  </span>
                ) : (
                  <button
                    key={pagina}
                    type="button"
                    className={`page-btn ${pagina === paginaAtual ? "page-btn--active" : ""}`}
                    onClick={() => irParaPagina(pagina)}
                  >
                    {pagina}
                  </button>
                )
              )}

              <button
                className="page-nav-btn"
                type="button"
                aria-label="Próxima página"
                onClick={() => irParaPagina(paginaAtual + 1)}
                disabled={paginaAtual >= totalPaginas}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
