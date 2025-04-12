import { useState } from 'react';
import MHeader from '../components/MHeader.jsx';
import { useNavigate } from 'react-router-dom';

export const AnimeFinder = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anilistId, setAnilistId] = useState(null);
  const [error, setError] = useState('');
  const [animeInfo, setAnimeInfoDiv] = useState('none');
  const [episode, setEpisode] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!imageUrl) return;

    setLoading(true);
    setError('');
    setVideoUrl(null);

    try {
      const encodedUrl = encodeURIComponent(imageUrl);
      const response = await fetch(`https://api.trace.moe/search?url=${encodedUrl}`);
      const data = await response.json();

      if (data.result && data.result.length > 0) {
        setVideoUrl(data.result[0].video);
        setAnilistId(data.result[0].anilist);
        setEpisode(data.result[0].episode);
        setAnimeInfoDiv('block');
      } else {
        setError('No results found.');
      }
    } catch (err) {
      setError('Failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (id) => {
    navigate(`/animeDetail?id=${id}`, { state: { id } });
    };
  return (
    <div style={{ backgroundColor: '#1f1f1f', color: 'white', minHeight: '100vh' }}>
      <MHeader />
      <h1>Anime Finder</h1>
      <p>
        Here you can find information about the anime you're looking for.
        Just paste the URL of the anime image below and click "Find Anime".
        Note: Make sure the image is a frame from an actual anime (not fanart or low-quality).
      </p>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste the image URL here..."
          style={{ width: '60%', padding: '0.5rem' }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Find Anime
        </button>
      </div>

      {loading && <p>🔍 Searching...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Result:</h3>
          <video controls width="480">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div style={{ display: animeInfo, marginTop: '2rem' }}>
        <h3>Anime Information:</h3>
        <p>Episode: {episode}</p>
        <p>Anilist ID: {anilistId}</p>
        <button  onClick={() => handleClick(anilistId)}>Ir para o anime</button>
      </div>
    </div>
  );
};
