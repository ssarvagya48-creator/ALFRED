import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  function handleSearch() {
    const query = searchText.trim();

    if (query === "") {
      return;
    }

    onSearch(query);
  }

  return (
    <div className="search-box">
      <div className="search-input-row">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      <p className="search-status">
        Search movies by title
      </p>
    </div>
  );
}

export default SearchBar;