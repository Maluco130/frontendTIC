import Home from "./Home.jsx";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Billboard.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceholderImage from "../images/ImagenPortada.webp";

function Billboard() {
  const [selectedCine, setSelectedCine] = useState(null);
  const [movies, setMovies] = useState([]);

  const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

  const handleCineSelection = async (id) => {
    setSelectedCine(id);
    setMovies([]);
    try {
      const response = await axios.get(`http://localhost:8081/billboard/branch/${id}`);
      if (response.status === 200) {
        console.log("API response:", response.data); // Verifica la respuesta aquí
        setMovies(response.data);
      } else {
        console.error("Error al obtener la cartelera");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const menu = (
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
  );

  const content = (
    <div className="movies-container">
      {selectedCine === null ? (
        <img src={PlaceholderImage} alt="Selecciona una sucursal" className="placeholder-image" />
      ) : movies.length > 0 ? (
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
              age={movie.age} // Pasa correctamente "age"
              trailerUrl={movie.trilerUrl} // Pasa correctamente "trilerUrl" como trailerUrl
            />
          </Link>
        ))
      ) : (
        <p>Cargando ...</p>
      )}
    </div>
  );

  return <Home menuContent={menu} pageContent={content} />;
}

export default Billboard;
