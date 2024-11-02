import { useNavigate } from 'react-router-dom';
import "../styles/MovieCard.css";

export default function MovieCard({
  slug,    // Recibe el slug generado del título
  title = "Título de la Película",
  posterUrl = "https://default-image-url.jpg",
  duration = "N/A",
  ageRating = "N/A",
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${slug}`);  // Navega a la página de detalles usando el slug
  };

  return (
    <button className="movie-card" onClick={handleCardClick}>
      <div className="movie-card__image-container">
        <img
          src={posterUrl}
          alt={`Póster de ${title}`}
          className="movie-card__image"
        />
        <span className="movie-card__rating">{ageRating}</span>
      </div>
      <div className="movie-card__details">
        <h3 className="movie-card__title">{title}</h3>
        <p>{duration}</p>
      </div>
    </button>
  );
}
