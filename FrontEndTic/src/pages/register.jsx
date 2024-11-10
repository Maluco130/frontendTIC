import "../styles/login_register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Importa el Header

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    cedula: "", // Agrega el campo de cédula
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
      const response = await axios.post("http://localhost:8081/users/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Registro exitoso:", response.data);
      window.location.href = "http://localhost:5173/";
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
      <Header /> {/* Incluye el Header */}
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

          {/* Campo de Cédula */}
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
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

        {/* Mostrar el mensaje de error si existe */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="change-options">
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
