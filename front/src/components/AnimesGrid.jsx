import React, { useEffect, useRef, useState } from 'react';
import "./AnimesGrid.css";
import { useNavigate, useLocation } from 'react-router-dom';

const AnimesGrid = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genderId = queryParams.get('id');
    const [anime, setAnime] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/animeDetail?id=${id}`, { state: { id } });
    };
  
    const fetchAnime = async () => {
        try {
            setLoading(true);
            let url = `https://api.jikan.moe/v4/anime?page=${page}`;
            if (genderId) {
                url += `&genres=${genderId}`;
            }
            const response = await fetch(url);
            const data = await response.json();
        
            if (Array.isArray(data.data)) {
                setAnime(prev => [...prev, ...data.data]);
            } else {
                console.warn("Expected data.data to be an array, but got:", data.data);
            }
        } catch (error) {
            console.error("Error fetching anime data:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchAnime();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [loading]);

    const truncateSynopsis = (text) => {
        if (!text) return "No description available.";
        const words = text.split(" ");
        if (words.length <= 40) return text;
        return words.slice(0, 40).join(" ") + "...";
    };

    return (
        <div className="animesGrid">
            {anime.map((item) => (
                <div key={item.mal_id} className="animeCard" onClick={() => handleClick(item.mal_id)}>
                    <img
                        src={item.images.jpg.image_url}
                        alt={item.title}
                        className="animeImg"
                    />
                    <h2 className="animeTitle">{item.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {truncateSynopsis(item.synopsis)}
                    </p>
                </div>
            ))}
            <div ref={loader} className="loading">
                {loading && <p>Carregando mais animes...</p>}
            </div>
        </div>
    );
};

export default AnimesGrid;
