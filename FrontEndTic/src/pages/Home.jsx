import "../styles/Home.css";
import Logo from "../images/WhatsApp Image 2024-10-19 at 19.50.34.png";
import { useNavigate } from "react-router-dom";

function Home({ menuContent, pageContent }) {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  // Función para manejar la selección de un botón
  const handleSelect = (path) => {
    navigate(path); // Navega a la página especificada
  };

  return (
    <div className="page-container">
      <nav className="sidebar">
        <button
          className="nav-toggle"
          onClick={() => handleSelect("/login")} // Cambia "/cine1" al path deseado
        >
          Login
        </button>
        {menuContent}
      </nav>
      <div className="main-content">
        <header className="header">
          <h1>What The Fun</h1>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </header>
        <main className="content">{pageContent}</main>
      </div>
    </div>
  );
}

export default Home;
