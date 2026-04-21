import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      setIsSearching(true);
      await onSearch(query);
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="logo-container">
        <img src="/favicon.png" alt="Anime Search Logo" className="logo" />
        <h1 className="app-title">Anime Explorer</h1>
        <p className="app-subtitle">Find your next favorite anime in seconds</p>
      </div>
      
      <div className="search-wrapper">
        <div className="search-input-container">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search anime titles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="search-input-field"
            disabled={isSearching}
          />
          <button 
            onClick={handleSearch} 
            className={`search-button ${isSearching ? "searching" : ""}`}
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? (
              <div className="spinner"></div>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7"></path>
                </svg>
                Search
              </>
            )}
          </button>
        </div>
        
        <div className="search-suggestions">
          <span className="suggestion-label">Try:</span>
          <div className="suggestion-tags">
            {["Naruto", "One Piece", "Attack on Titan", "Demon Slayer"].map((tag) => (
              <button 
                key={tag}
                className="suggestion-tag"
                onClick={() => {
                  setQuery(tag);
                  setTimeout(() => handleSearch(), 100);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
