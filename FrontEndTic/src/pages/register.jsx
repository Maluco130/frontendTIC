import "../styles/login_register.css";

function Register() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Register</h2>

        <form action="/login" method="POST">
          <label htmlFor="username">User</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <input type="submit" value="Ingresar" />
        </form>
        <div className="change-options">
          <p>Don't have an account?</p>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
