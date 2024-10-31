import "../styles/MovieCard.css";

export default function MovieCard({
  title = "Título de la Película",
  posterUrl = "https://via.placeholder.com/200x300", // Placeholder si no hay URL válida
  duration = "Duración no disponible",
  ageRating = "N/A",
}) {
  return (
    <button className="movie-card">
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
        <p className="movie-card__duration">{duration}</p>
      </div>
    </button>
  );
}

