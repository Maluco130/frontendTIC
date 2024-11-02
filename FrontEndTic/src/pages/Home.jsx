import "../styles/Home.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Home({ menuContent, pageContent }) { // Añadimos pageContent a las props
  const navigate = useNavigate();

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      {/* Sidebar with branch menu and login */}
      <nav className="sidebar">
        <button
          className="nav-toggle"
          onClick={() => handleSelect("/login")}
        >
          Login
        </button>
        {menuContent}
      </nav>

      {/* Main content area */}
      <div className="main-content">
        <Header /> {/* Reusable header component */}
        
        {/* Renderiza el contenido dinámico que recibe desde Billboard */}
        {pageContent} 

        {/* Main content introduction */}
        <main className="content">
          <div className="intro-content">
            <h3 className="section-subtitle">Bienvenido a What The Fun Cinemas</h3>
            <p className="section-text">Descubre la experiencia cinematográfica más innovadora en cada una de nuestras sucursales. Selecciona una sucursal para ver la cartelera y horarios disponibles.</p>
          </div>

          {/* Branch highlights */}
          <div className="branch-highlights">
            <h3 className="section-subtitle">Elige tu Sucursal</h3>
            <p className="section-text">Con sucursales en diversos puntos de la ciudad, encuentra la más cercana para ti:</p>
            <ul className="section-text">
              <li>Selecciona tu sucursal favorita y descubre su cartelera</li>
              {/* Additional branches with short descriptions */}
            </ul>
          </div>

          {/* Featured movies section */}
          <div className="featured-movies">
            <h3 className="section-subtitle">Películas Recien Agregadas</h3>
            <div className="movie-thumbnails">
              <div className="movie-thumbnail">
                <img src="https://movieprodportalstoweb.blob.core.windows.net/movieposters/sonrie2.jpg" alt="Pelicula 1" />
                <p className="section-text">Sonrie 2</p>
              </div>
              <div className="movie-thumbnail">
                <img src="https://movieprodportalstoweb.blob.core.windows.net/movieposters/lacaidadelvuelo811.jpg" alt="Pelicula 2" />
                <p className="section-text">La Caída Del Vuelo 811</p>
              </div>
              <div className="movie-thumbnail">
                <img src="https://movieprodportalstoweb.blob.core.windows.net/movieposters/robotsalvaje.jpg" alt="Pelicula 3" />
                <p className="section-text">Robot Salvaje</p>
              </div>
              {/* Add more movie thumbnails with URLs if needed */}
            </div>
          </div>

          {/* Promotions and upcoming releases */}
          <div className="promotions">
            <h3 className="section-subtitle">Promociones y Próximos Estrenos</h3>
            <div className="promotion-card">
              <p className="section-text"><strong>Descuento del 20%</strong> en funciones de los martes.</p>
            </div>
            <div className="promotion-card">
              <p className="section-text"><strong>Estreno Especial:</strong> Asunto de honor el 15 de noviembre.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

