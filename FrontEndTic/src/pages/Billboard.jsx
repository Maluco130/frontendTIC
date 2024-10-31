import Home from "./Home.jsx";
import MovieCard from "../components/MovieCard.jsx";
import "../styles/Billboard.css";
import React, { useState } from "react";
import axios from 'axios';

function Billboard() {
  const [selectedCine, setSelectedCine] = useState(null); 
  const [selectedButton, setSelectedButton] = useState(null);
  const [movies, setMovies] = useState([]); 

  const handleCineSelection = async (id) => {
    setSelectedCine(id);
    setSelectedButton(id);
    try {
      const response = await axios.get(`http://localhost:8081/billboard/branch/${id}`);
      if (response.status === 200) {
        setMovies(response.data); 
      } else {
        console.error('Error al obtener la cartelera');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
    }
  };


  const menu = (
    <div className="nav-buttons">
      {[
        { id: 1, name: 'Punta Carretas' },
        { id: 2, name: 'Ciudad Vieja' },
        { id: 3, name: 'Pocitos' },
        { id: 4, name: 'Carrasco' },
        { id: 5, name: 'Tres Cruces' },
        { id: 6, name: 'Centro' },
        { id: 7, name: 'Malvín' },
        { id: 8, name: 'Buceo' },
      ].map((cine) => (
        <button
          key={cine.id}
          className={`cine-button ${selectedCine === cine.id ? 'selected' : ''}`}
          onClick={() => handleCineSelection(cine.id)}
        >
          {cine.name}
        </button>
      ))}
    </div>
  );

  const content = (
    <>
      <h2>Contenido Principal</h2>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={movie.imageUrl}
            duration={movie.duration}
            ageRating={movie.ageRating}
          />
        ))}
      </div>
    </>
  );

  return <Home menuContent={menu} pageContent={content} />;
}

export default Billboard;
