import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import "./Home.css";
import {
  getAllVideogames,
  getGenres,
  getVideogameByName,
  getVideogameById,
  VideogameCreate,
  filterGamesByGenre,
  filterCreatedIn,
  orderByName,
  orderByRating,
} from "../../Redux/Actions";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((store) => store.videogames);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("");

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  if (!allVideogames.length) {
    return <Loader />;
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterGamesByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedIn(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  
  return (
    <div>
      <div >
        <div>
          <Link to="/VideogameCreate">
            CREATE VIDEOGAME
          </Link>
        <div>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Reload
          </button>
        </div>
      </div>
      <div>
        <Navbar
          handleSort={handleSort}
          handleRating={handleRating}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
        />
      </div>
    </div>
    <ul>
      {
      currentVideogames.map((video) => {
        return (
          <Link to={`/videogames/${video.id}`} >
            <Card
              id={video.id}
              key={video.id}
              name={video.name}
              description={video.description}
              released={video.released}
              rating={video.rating}
              platforms={video.platforms}
              background_image={video.background_image}
              genre={video.genre}
            />
          </Link>
        );
      })}
    </ul>
      <div className="pagination">
        <Paging
          currentPage={currentPage}
          allVideogames={allVideogames.length}
          videogamesPerPage={videogamesPerPage}
          page={page}
          
        />
      </div>
      
    </div>
  );
}

export default Home;