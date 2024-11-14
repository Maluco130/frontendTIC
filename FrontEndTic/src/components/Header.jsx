import React from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import "../styles/Header.css";
import Logo from "/WhatsApp Image 2024-10-19 at 19.50.34.png";

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">What The Fun</h1>
      {/* Envolvemos el logo en un <Link> para que redirija a la página de inicio */}
      <Link to="/" className="logo-link">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
