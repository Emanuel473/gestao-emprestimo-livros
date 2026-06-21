import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();

  // Estados para controlar o formulário
  const [modo, setModo] = useState("login"); // pode ser 'login' ou 'cadastro'
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // URL da sua API no Render
  const API_URL = "https://api-emprestimo-livros.onrender.com";

  // Validação da força da senha: no mínimo 7 caracteres, 1 número e 1 letra maiúscula
  const validarSenha = (senhaDigitada) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;
    return regex.test(senhaDigitada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Validações básicas de campos vazios
    if (!email || !senha || (modo === "cadastro" && !nome)) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    // Aplica a regra de validação de senha caso esteja cadastrando
    if (modo === "cadastro" && !validarSenha(senha)) {
      setErro(
        "A senha deve conter no mínimo 7 caracteres, pelo menos 1 número e pelo menos 1 letra maiúscula (Ex: Senha123).",
      );
      return;
    }

    setCarregando(true);

    try {
      const rota = modo === "login" ? "/login" : "/usuarios";

      const resposta = await fetch(`${API_URL}${rota}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          modo === "login" ? { email, senha } : { nome, email, senha },
        ),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Ocorreu um erro inesperado.");
      }

      if (modo === "login") {
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        navigate("/dashboard");
      } else {
        alert("Conta criada com sucesso! Faça o seu login agora.");
        setModo("login");
        setSenha("");
        setErro("");
      }
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  const alternarModo = (novoModo) => {
    setModo(novoModo);
    setErro("");
    setNome("");
    setSenha("");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Prometheus" className="logo" />
      <h1>PROMETHEUS</h1>
      <p>Sistema Inteligente de Biblioteca</p>

      <div className="login-card">
        <h2 className="login-title">
          {modo === "login" ? "LOGIN" : "CADASTRO"}
        </h2>

        {erro && <p className="error-message">{erro}</p>}

        <form onSubmit={handleSubmit}>
          {modo === "cadastro" && (
            <>
              <label>Nome</label>
              <input
                className="login-input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
              />
            </>
          )}

          <label>Email</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@email.com"
          />

          <label>Senha</label>
          <input
            className="login-input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={modo === "login" ? "••••••••" : "Ex: Senha123"}
          />

          <button className="login-button" type="submit" disabled={carregando}>
            {carregando
              ? "Aguarde..."
              : modo === "login"
                ? "Entrar"
                : "Cadastrar"}
          </button>
        </form>

        <div className="toggle-mode-container">
          {modo === "login" ? (
            <p>
              Não tem uma conta?{" "}
              <span onClick={() => alternarModo("cadastro")}>
                Cadastre-se aqui
              </span>
            </p>
          ) : (
            <p>
              Já possui uma conta?{" "}
              <span onClick={() => alternarModo("login")}>Faça login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
