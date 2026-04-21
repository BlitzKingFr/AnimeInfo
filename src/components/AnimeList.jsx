import AnimeCard from './AnimeCard';

const AnimeList = ({ animes, loading, error }) => {
  if (loading) {
    return <p className="status-text">Loading anime...</p>;
  }

  if (error) {
    return <p className="status-text error-text">{error}</p>;
  }

  if (animes.length === 0) {
    return <p className="status-text">No results found.</p>;
  }

  return (
    <div className='anime-result'>
      {animes.map((anime) => <AnimeCard key={anime.mal_id} anime={anime} />)}
    </div>
  );
};

export default AnimeList;