import "../styles/MovieCard.css";

export default function MovieCard({
  title = "Título de la Película",
  posterUrl = "https://via.placeholder.com/200x300", 
  duration = "Duración no disponible", 
  age = "N/A", 
}) {
  return (
    <button className="movie-card">
      <div className="movie-card__image-container">
        <img
          src={posterUrl}
          alt={`Póster de ${title}`}
          className="movie-card__image"
        />
        <span className="movie-card__rating">{age}</span> 
      </div>
      <div className="movie-card__overlay">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__duration">
          {duration} min
        </p>
      </div>
    </button>
  );
}
