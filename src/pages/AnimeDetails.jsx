import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeById } from "../services/jikanAPI";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const embedYoutubeId = anime?.trailer?.embed_url?.match(/\/embed\/([^?&/]+)/)?.[1];
  const trailerUrl =
    anime?.trailer?.url ||
    (anime?.trailer?.youtube_id ? `https://www.youtube.com/watch?v=${anime.trailer.youtube_id}` : null) ||
    (embedYoutubeId ? `https://www.youtube.com/watch?v=${embedYoutubeId}` : null);

  useEffect(() => {
    async function getAnime() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAnimeById(id);
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError("Failed to load anime details.");
      } finally {
        setLoading(false);
      }
    }
    getAnime();
  }, [id]);

  if (loading) return <p className="status-text">Loading anime details...</p>;

  if (error || !anime) {
    return (
      <div className="page-container">
        <p className="status-text error-text">{error || "Anime details not found."}</p>
        <Link to="/" className="back-link">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container details-page">
      <Link to="/" className="back-link">
        ← Back to search
      </Link>
      <div className="anime-details">
        <img src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} alt={anime.title} />
        <div className="details-text">
        <h1>{anime.title}</h1>
        <div className="details-metrics">
          <span>Status: {anime.status || "Unknown"}</span>
          <span>Episodes: {anime.episodes || "Unknown"}</span>
          <span>Score: {anime.score || "N/A"}</span>
          <span>Year: {anime.year || "N/A"}</span>
        </div>
        <p>{anime.synopsis || "No synopsis available."}</p>
        {anime.genres?.length > 0 && (
          <div className="genre-list">
            {anime.genres.map((genre) => (
              <span key={genre.mal_id} className="genre-pill">
                {genre.name}
              </span>
            ))}
          </div>
        )}
        {trailerUrl && (
          <a href={trailerUrl} target="_blank" rel="noreferrer" className="trailer-link">
            Watch trailer
          </a>
        )}
      </div>
    </div>
    </div>
  );
}

export default AnimeDetails;
