import "./AnimeInfos.css";

const AnimeInfos = ({ anime }) => {
    return (
        <div className="anime-infos">
            <img src={anime.images?.jpg?.large_image_url} alt={anime.title} />
            <div className="anime-details">
                <h2>{anime.title}</h2>
                <p>{anime.synopsis}</p>
                <p>
                    Gênero: {anime.genres?.length > 0 ? anime.genres[0].name : "Unknown"}
                </p>
                <p>
                    Tipo: {anime.type || "Unknown"}
                </p>
            </div>
        </div>
    );
};

export default AnimeInfos;
