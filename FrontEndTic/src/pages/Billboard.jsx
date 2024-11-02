import Home from "./Home.jsx";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Billboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Billboard() {
  const [selectedCine, setSelectedCine] = useState(null);
  const [movies, setMovies] = useState([]);

  // Función para crear el slug para los enlaces
  const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

  // Efecto para cargar las películas al seleccionar una sucursal
  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedCine) {
        try {
          const response = await axios.get(`http://localhost:8081/billboard/branch/${selectedCine}`);
          if (response.status === 200) {
            setMovies(response.data); // Guarda las películas de la sucursal seleccionada
          } else {
            console.error("Error al obtener la cartelera");
          }
        } catch (error) {
          console.error("Error en la solicitud:", error.message);
        }
      }
    };

    fetchMovies();
  }, [selectedCine]); // Ejecuta el efecto cada vez que selectedCine cambia

  const handleCineSelection = (id) => {
    setSelectedCine(id); // Establece la sucursal seleccionada
    setMovies([]); // Limpia las películas actuales mientras se cargan las nuevas
  };

  // Menú de botones de sucursales
  const menu = (
    <div className="sidebar">
      <button className="login-button">Login</button> {/* Botón de Login */}
      <div className="nav-buttons">
        {[
          { id: 1, name: "Punta Carretas" },
          { id: 2, name: "Ciudad Vieja" },
          { id: 3, name: "Pocitos" },
          { id: 4, name: "Carrasco" },
          { id: 5, name: "Tres Cruces" },
          { id: 6, name: "Centro" },
          { id: 7, name: "Malvín" },
          { id: 8, name: "Buceo" },
        ].map((cine) => (
          <button
            key={cine.id}
            className={`cine-button ${selectedCine === cine.id ? "selected" : ""}`}
            onClick={() => handleCineSelection(cine.id)}
          >
            {cine.name}
          </button>
        ))}
      </div>
    </div>
  );
  
  // Contenido de la cartelera
  const billboardContent = (
    <div className="billboard-background"> {/* Añadimos una clase específica */}
      <h2>Cartelera</h2>
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movie/${createSlug(movie.title)}`}
              key={movie.title}
              state={{ title: movie.title }}
            >
              <MovieCard
                title={movie.title}
                posterUrl={movie.imageUrl}
                duration={movie.duration}
                ageRating={movie.ageRating}
              />
            </Link>
          ))
        ) : (
          <p>Cargando películas...</p> // Muestra un mensaje si aún no se han cargado las películas
        )}
      </div>
    </div>
  );
  

  // Contenido de bienvenida
  const welcomeContent = (
    <>
    
    </>
  );

  return (
    <Home 
      menuContent={menu} 
      pageContent={selectedCine ? billboardContent : welcomeContent} 
    />
  );
}


export default Billboard;
