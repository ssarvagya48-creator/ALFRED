import { useEffect, useState } from "react";
import "./Hero.css";

function Hero({ movies }) {
  const featuredMovies = movies.slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % featuredMovies.length;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (featuredMovies.length === 0) {
    return null;
  }

  const movie = featuredMovies[activeIndex];

  return (
    <section className="hero">
      <div
        key={movie.id}
        className="hero-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      <div className="hero-overlay" />

      <div className="hero-cloud hero-cloud-one" />
      <div className="hero-cloud hero-cloud-two" />

      <div className="hero-content">
        <p className="hero-label">FEATURED MOVIE</p>

        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>★ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>Movie</span>
        </div>

        <p className="hero-description">
          {movie.overview || "Discover something new to watch."}
        </p>

        <div className="hero-actions">
          <button className="hero-primary">▶ Watch Now</button>

          <button className="hero-secondary">+ My List</button>
        </div>
      </div>

      <button
        className="hero-arrow hero-arrow-left"
        onClick={() =>
          setActiveIndex(
            (activeIndex - 1 + featuredMovies.length) % featuredMovies.length,
          )
        }
      >
        ‹
      </button>

      <button
        className="hero-arrow hero-arrow-right"
        onClick={() =>
          setActiveIndex((activeIndex + 1) % featuredMovies.length)
        }
      >
        ›
      </button>

      <div className="hero-dots">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
