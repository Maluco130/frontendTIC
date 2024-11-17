import "../styles/login_register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    idUs: "",
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
      const response = await axios.post("https://wtf-cinema.onrender.com/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registro exitoso - respuesta completa:", response.data);

      // Guarda el token de autenticación en `localStorage`
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        navigate("/");
      } else {
        setErrorMessage("No se pudo obtener el token de autenticación. Por favor, inicia sesión manualmente.");
      }
    } catch (error) {
      console.error("Error en el registro:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 409) {
        setErrorMessage("El correo ya está registrado. Por favor, intenta con otro.");
      } else {
        setErrorMessage("Ocurrió un error al registrar. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <div className="login-page no-sidebar">
      <Header />
      <div className="login-container">
        <h2>Registrarse</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="idUs">Cédula</label>
          <input
            type="text"
            id="idUs"
            name="idUs"
            value={formData.idUs}
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

          <button type="submit">Registrar</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="change-options">
          <p>Ya tienes una cuenta?</p>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}
