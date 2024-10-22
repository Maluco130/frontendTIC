import "../styles/MovieCard.css";

export default function MovieCard({
  title = "Título de la Película",
  posterUrl = "https://movieprodportalstoweb.blob.core.windows.net/movieposters/venomelultimobaile.jpg",
  duration = "2h 30min",
  ageRating = "13+",
}) {
  return (
    <div className="movie-card">
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
      </div>
      <div className="movie-card__details movie-card__meta"></div>
    </div>
  );
}
