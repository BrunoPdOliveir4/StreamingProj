import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import '@splidejs/react-splide/css';
import Slide from './Slide';
import "./ComponentCarrossel.css";

const ComponentCarrossel = () => {  
    const quantityAnimes = 8;
    const [animes, setAnimes] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                let animeData = [];
                
                while (animeData.length < quantityAnimes) {
                    const res = await axios.get(`https://api.jikan.moe/v4/random/anime`);
                    if (res.data.data && res.data.data.images && res.data.data.images.jpg) {
                        animeData.push(res.data.data);
                    }
                }
        
                console.log(animeData);
                setAnimes(animeData.map(anime => anime)); 
        
            } catch (err) {
                console.error("Error fetching images or videos:", err);
            }
        };
        
        
        fetchImages();
    }, []); // Runs only once when component mounts

    return (
        <div className="carrossel-container">
            <Splide
                options={{
                    type: 'loop',
                    perPage: 3,
                    perMove: 1,
                    pagination: false,
                    breakpoints: {
                        640: { perPage: 1 },
                        1024: { perPage: 2 },
                    },
                }}
            >
                {animes.length > 0 ? (
                    animes.map((anime, index) => (
                        
                        <SplideSlide key={index}>
                            <Slide source={anime.images.jpg.large_image_url} title={anime.title} id={anime.mal_id}/>
                        </SplideSlide>
                    ))
                ) : (
                    <p>Loading images...</p> // Placeholder while loading
                )}
            </Splide>
        </div>
    );
};

export default ComponentCarrossel;
