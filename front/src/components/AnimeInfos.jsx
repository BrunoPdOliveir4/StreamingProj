import "./AnimeInfos.css";

const AnimeInfos = ({ anime }) => {
    return (
        <div className="anime-infos">
            <div className="header-section">
                <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="cover-image"
                />
                <div className="info-text">
                    <h1>{anime.title} ({anime.title_japanese})</h1>
                    <p><strong>English:</strong> {anime.title_english || "N/A"}</p>
                    <p><strong>Episodes:</strong> {anime.episodes || "?"}</p>
                    <p><strong>Duration:</strong> {anime.duration}</p>
                    <p><strong>Status:</strong> {anime.status}</p>
                    <p><strong>Score:</strong> {anime.score} ({anime.scored_by} votes)</p>
                    <p><strong>Rank:</strong> #{anime.rank} | <strong>Popularity:</strong> #{anime.popularity}</p>
                    <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
                    <p><strong>Studios:</strong> {anime.studios.map(s => s.name).join(", ")}</p>
                    <p><strong>Licensors:</strong> {anime.licensors.map(l => l.name).join(", ") || "N/A"}</p>
                </div>
            </div>

            {anime.trailer?.embed_url && (
                <div className="trailer-section">
                    <h2>Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={anime.trailer.embed_url}
                        title="Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <div className="description-section">
                <h2>Synopsis</h2>
                <p>{anime.synopsis || "No synopsis available."}</p>

                {anime.background && (
                    <>
                        <h2>Background</h2>
                        <p>{anime.background}</p>
                    </>
                )}
            </div>

            {anime.relations?.length > 0 && (
                <div className="relations-section">
                    <h2>Related</h2>
                    {anime.relations.map((rel, idx) => (
                        <div key={idx}>
                            <strong>{rel.relation}:</strong> {rel.entry.map(e => e.name).join(", ")}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnimeInfos;
