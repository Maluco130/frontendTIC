import "../styles/login_register.css";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensaje de error
  const navigate = useNavigate(); // Hook para redirigir al Home

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/users/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Registro exitoso:', response.data);
      window.location.href = 'http://localhost:5173/'; // Redirige al Home si el registro es exitoso

    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      // Establece el mensaje de error según el estado del error
      if (error.response && error.response.status === 409) {
        setErrorMessage('El correo ya está registrado. Por favor, intenta con otro.');
      } else {
        setErrorMessage('Ocurrió un error al registrar. Inténtalo nuevamente.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">email</label>
          <input
          type="email"
          id="mail"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
         />

          <label htmlFor="name">name</label>
          <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          />
          
          <label htmlFor="password">password</label>
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
