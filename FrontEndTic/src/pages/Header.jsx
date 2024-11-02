import React from 'react';
import "../styles/Header.css"; // Assuming you create a new CSS file for Header-specific styles
import Logo from "../images/WhatsApp Image 2024-10-19 at 19.50.34.png"; // Adjust path as necessary

function Header() {
  return (
    <header className="header">
      <h1>What The Fun</h1>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
    </header>
  );
}

export default Header;
