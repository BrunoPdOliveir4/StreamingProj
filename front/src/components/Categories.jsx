import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css"; 
import { useNavigate } from "react-router-dom";
export const Categories = () => {
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
            setCategory(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        fetchCategory();   
    }, []); 
    return (
        <div className="categories">
            {category.map((cat) => (
                <div key={cat.mal_id} className="category-card" onClick={() => navigate(`/category?id=${cat.mal_id}`)}>
                    <h2>{cat.name}</h2>
                    <p>{cat.count} animes</p>
                </div>
            ))}
        </div>
    )
}
