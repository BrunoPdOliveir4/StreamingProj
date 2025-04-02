import { useNavigate } from "react-router-dom";
import React from "react";
import "./Slide.css";

const Slide = ({ source, title, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Passing the 'id' as a query parameter
    navigate(`/animeDetail?id=${id}`, { state: { id } });
  };

  return (
    <div className="slide" onClick={handleClick}>
      <img src={source} alt={title} />
      <p className="title">{title}</p>
    </div>
  );
};

export default Slide;
