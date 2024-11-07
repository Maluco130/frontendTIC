import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header"; 
import "../styles/MovieDetails.css"; 

function MovieDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const title = location.state?.title || slug.replace(/-/g, " ");

  useEffect(() => {
    if (title) {
      axios.get(`http://localhost:8081/movies/title/${title}`, { 
        withCredentials: true,
      })
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los detalles de la película:", error);
        setLoading(false);
      });
    }
  }, [title]);

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  return (
    <div className="movie-page-container">
      {/* Encabezado */}
      <Header /> {/* Incluye el componente Header */}

      {/* Menú Celeste */}
      <nav className="sidebar">
        <p className="select-cine-text">Seleccione una función</p>
        <div className="nav-buttons">
          <button className="cine-button">Función 1 - 2:00 PM</button>
          <button className="cine-button">Función 2 - 5:00 PM</button>
          <button className="cine-button">Función 3 - 8:00 PM</button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="movie-info-container">
          <div className="movie-poster">
            <img src={movie.imageUrl} alt={`Poster de ${movie.title}`} />
            <a 
              href={movie.trilerUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="play-button"
            >
              ▶
            </a>
          </div>

          <div className="movie-info">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span className="movie-rating">Apta +18</span>
              <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              <span>{movie.genre}</span>
            </div>
            <p className="movie-description">{movie.description}</p>
          </div>
        </div>
      </div>
  );
}

export default MovieDetails;
