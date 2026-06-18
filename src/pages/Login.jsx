import "../styles/Login.css"
import logo from '../assets/logo.jpeg'
function Login() {
  return (
    <div className="login-container">
      <img src={logo} alt="Prometheus" className="logo" />
      <h1>PROMETHEUS</h1>
      <p>Sistema Inteligente de Biblioteca</p>

      <div className="login-card">
        <h2 className="login-title">LOGIN</h2>

        <label>Email</label>
        <input className="login-input" type="email" />

        <label>Senha</label>
        <input className="login-input" type="password" />

        <button className="login-button">
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Login