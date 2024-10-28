import "../styles/login_register.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form action="/login" method="POST">
          <label htmlFor="username">Usuario o Email:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />

          <input type="submit" value="Ingresar" />
        </form>
      </div>
    </div>
  );
}

export default Login;
