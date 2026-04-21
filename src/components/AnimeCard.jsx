
import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <Link to={`/anime/${anime.mal_id}`}>
        <img src={anime.images?.jpg?.image_url} alt={anime.title} />
        <div className="anime-card-content">
          <h3>{anime.title}</h3>
          <p>
            <span>{anime.type || "Unknown"}</span>
            <span>{anime.episodes || "?"} eps</span>
            <span>Score {anime.score || "N/A"}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard;