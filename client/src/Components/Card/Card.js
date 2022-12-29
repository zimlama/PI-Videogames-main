import React from "react";
import "./Card.css";

function Card({ id, name, description, released, rating, platforms, background_image}) {
   return(
    <div className="video-card">
      <h1>{name}</h1>
      <h3>{description}</h3>
      <h3>{released}</h3>
      <h3>{rating}</h3>
      <h3>Available Platforms: </h3>
          <h4>{platforms}</h4>
      <img className="card-img" src={background_image} alt={name} />
    </div>
  );
}

export default Card;
