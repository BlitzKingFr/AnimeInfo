import { useEffect, useState } from "react";
import { fetchAnimeByName, fetchTopAnime } from "../services/jikanAPI";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [title, setTitle] = useState("Top Anime");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTopAnime = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchTopAnime();
        setAnimeList(result || []);
      } catch (err) {
        console.error("Error fetching top anime:", err);
        setError("Could not load top anime right now.");
      } finally {
        setLoading(false);
      }
    };

    loadTopAnime();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    setTitle(`Search results for "${query}"`);
    try {
      const result = await fetchAnimeByName(query);
      setAnimeList(result || []);
    } catch (err) {
      console.error("Error searching anime:", err);
      setError("Search failed. Please try again.");
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <SearchBar onSearch={handleSearch} />
      <section className="results-section">
        <div className="results-header">
          <h2>{title}</h2>
          {hasSearched && (
            <p className="results-meta">
              {animeList.length > 0
                ? `${animeList.length} anime found`
                : "No anime found for this search"}
            </p>
          )}
        </div>
        <AnimeList animes={animeList} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default Home;