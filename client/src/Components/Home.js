import React, { useEffect } from 'react'
// useEffect para detectar cualquier cambio en la pagina
import { useDispatch, useSelector } from "react-redux";
// useDispatch es para enviar la info, y useSelector es para darle al click al form
import Card from "./Card/Card";
import "./Home.css";

import { getAllVideogames } from "../Redux/Actions";


function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);

  useEffect(() => { dispatch(getAllVideogames());});

  return (
    <div className="cards">{allVideogames.length === 0 ? (
      <div>Loading</div>
    ) : (
      allVideogames.map((video) => (
        <Card
          id={video.id}
          name={video.name}
          description={video.description}
          released={video.released}
          rating={video.rating}
          platforms={video.platforms.length === 0 ? (<div>No Platform Available</div>) 
          : (video.platforms.map ((platform)=> platform.name))}
          background_image={video.background_image}
        />
      ))
    )}
  </div>
);
}

export default Home