import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Seats from "./Seats";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("");
  const [functions, setFunctions] = useState([]);
  const [showSeatsModal, setShowSeatsModal] = useState(false);
  const [selectedFunctionId, setSelectedFunctionId] = useState(null); // Cambio aquí
  const title = location.state?.title || slug.replace(/-/g, " ");

  // Cargar detalles de la película
  useEffect(() => {
    if (title) {
      axios
        .get(`https://wtf-cinema.onrender.com/movies/title/${title}`, {
          withCredentials: true,
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los detalles de la película:", error);
          setLoading(false);
        });
    }
  }, [title]);

  // Cargar funciones según el día seleccionado
  useEffect(() => {
    if (selectedDay) {
      axios
        .get(
          `https://wtf-cinema.onrender.com/functions/fun/1/${title}/${selectedDay}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setFunctions(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las funciones:", error);
        });
    }
  }, [selectedDay, title]);

  const openSeatsModal = (idFun) => {
    console.log("Opening modal with function ID:", idFun);
    setSelectedFunctionId(idFun); // Asegúrate de que esta es la función correcta para configurar el estado
    setShowSeatsModal(true); // Muestra el modal
  };

  const closeSeatsModal = () => {
    setShowSeatsModal(false); // Oculta el modal
  };

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  return (
    <div
      className="movie-page-container"
      style={{ overflowY: "hidden", height: "100vh" }}
    >
      <Header />

      <nav className="sidebar">
        <div className="day-select-container">
          <select
            className="day-dropdown"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Seleccionar día ▼</option>
            <option value="11">Lunes 11</option>
            <option value="12">Martes 12</option>
            <option value="13">Miércoles 13</option>
            <option value="14">Jueves 14</option>
            <option value="15">Viernes 15</option>
          </select>
        </div>

        {functions.length > 0 && (
          <div className="function-select-container">
            <p className="select-cine-text">
              Seleccione una función para comprar
            </p>
            <div className="nav-buttons">
              {functions.map((func, index) => (
                <button
                  key={index}
                  className="cine-button"
                  onClick={() => openSeatsModal(func.idFun)}
                >
                  {func.startTime.slice(0, 5)} - {func.endTime.slice(0, 5)} |{" "}
                  {func.projectionRoom.type}
                </button>
              ))}
            </div>
          </div>
        )}

        {functions.length === 0 && (
          <p className="no-functions-message">
            No hay funciones para este día.
          </p>
        )}
      </nav>

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
          <hr />
          <div className="movie-meta">
            <span className="movie-rating">Apta {movie.age}</span>
            <span>
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </span>
            <span>{movie.genre}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>

      {/* Modal para los asientos */}
      {showSeatsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeSeatsModal}>
              X
            </button>
            <Seats idFun={selectedFunctionId} />{" "}
            {/* Asegúrate de pasar el valor */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
