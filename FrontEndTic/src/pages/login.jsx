import "../styles/login_register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://wtf-cinema.onrender.com/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login exitoso:", response.data);

      // Guarda el token de autenticación en `localStorage`
      localStorage.setItem("authToken", response.data.token);

      // Guarda nombre y correo en `localStorage`
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userEmail", formData.mail);
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      console.error("Error en el login:", error.response ? error.response.data : error.message);
      setErrorMessage("Credenciales incorrectas. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-page no-sidebar">
      <Header />
      <div className="login-container">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Iniciar Sesión</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="change-options">
          <p>¿No tienes una cuenta?</p>
          <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}
