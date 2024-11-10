import "../styles/Home.css";
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
          onClick={() => handleSelect("/login")}
        >
          Login
        </button>
        {menuContent}
      </nav>
      <div className="main-content">
        <main className="content">{pageContent}</main>
      </div>
    </div>
  );
}

export default Home;
