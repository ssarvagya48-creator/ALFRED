import "./MovieCard.css";

function MovieCard({ title, year, genre, poster, rating }) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
          />
        ) : (
          <span>POSTER</span>
        )}
      </div>

      <div className="movie-info">
        <h3>{title}</h3>

        <div className="movie-meta">
          <span>{year}</span>
          <span>{genre}</span>
          <span>★ {rating?.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;