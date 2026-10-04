import { useEffect, useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  async function fetchMovies(searchQuery = "") {
    try {
      setLoading(true);
      setError("");

      let url =
        "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=1";

      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery,
        )}&language=en-US&page=1`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not load movies");
      }

      const data = await response.json();

      setMovies(data.results || []);
    } catch (error) {
      console.error(error);
      setError("Movies could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleSearch(query) {
    fetchMovies(query);
  }
  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="hero-section">
          <Hero movies={movies} />
        </section>

        <section className="search-section">
          <SearchBar onSearch={handleSearch} />
        </section>

        <section className="movies-section">
          <div className="section-heading">
            <div>
              <p className="section-label">DISCOVER</p>
              <h2>Explore Movies</h2>
            </div>

            <button className="view-all-button">View All →</button>
          </div>

          {loading && <p>Loading movies...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  year={movie.release_date?.slice(0, 4)}
                  genre="Movie"
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
