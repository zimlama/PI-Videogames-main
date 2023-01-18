import React from "react";
import "./Card.css";

import "./Card.css";

function Card({
  id,
  name,
  description,
  released,
  rating,
  platforms,
  background_image,
  genre,
}) {
  return (
    <div className="video-card">
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <h3> released: {released}</h3>
      </div>
      <div>
        <h3>rating: {rating}</h3>
      </div>
      <div>
        <ul>{genre && genre.map((gen) => <li>{gen}</li>)}</ul>
        <ul>{platforms && platforms.map((pla) => <li>{pla}</li>)}</ul>;
      </div>
      <div className="videogameImg">
        <img className="card-img" src={background_image} alt={name} />
      </div>
    </div>
  );
}

export default Card;
