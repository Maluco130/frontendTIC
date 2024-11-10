import "../styles/login_register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Importa el Header

export default function Login() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axios.post("http://localhost:8081/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login exitoso:", response.data);
      window.location.href = "http://localhost:5173/";
    } catch (error) {
      console.error("Error en el login:", error.response ? error.response.data : error.message);
      setErrorMessage("Credenciales incorrectas. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-page no-sidebar">
      <Header /> {/* Incluye el Header */}
      <div className="login-container">
        <h2>Iniciar secion</h2>

        <form onSubmit={handleSubmit}>
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

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="change-options">
          <p>¿No tienes una cuenta?</p>
          <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}
