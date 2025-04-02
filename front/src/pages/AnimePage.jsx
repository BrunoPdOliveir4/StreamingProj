import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import MHeader from "../components/MHeader";
import AnimeInfos from "../components/AnimeInfos";

const AnimePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            setError(null);

            try {
                const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
                setAnime(res.data.data);
                setLoading(false); 
                console.log(res.data.data); 
            } catch (error) {
                console.error("Error fetching anime data:", error);
                setError("Failed to fetch data"); 
                setLoading(false); 
            }
        };

        if (id) {
            fetchData();
        }

    }, [id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div style={{ backgroundColor: '#1f1f1f', height: '100vh' }}>
            <MHeader/>
            <AnimeInfos anime={anime} />
        </div>
    );
};

export default AnimePage;
