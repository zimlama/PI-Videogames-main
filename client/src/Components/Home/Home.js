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
  videogameCreate,
  filterGamesByGenre,
  filterCreatedIn,
  orderByName,
  orderByRating,
} from "../../Redux/Actions";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((store) => store.videogames); //trae todo lo que esta en el estado
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); //cantidad de videos x pagina
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState(""); //estado local de asc y desc que arranca vacio

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
          <Link to="/videogameCreate">
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
        console.log('esto es video.id: ', video.id);
        return (
          <Link to={`/videogames/${video.id}`} >
            <Card
              id={video.id}
              key={video.id}
              name={video.name}
              description={video.description}
              released={video.released}
              rating={video.rating}
              platforms={
                video.platforms.length === 0 ? (
                  <div>No Platform Available</div>
                ) : (
                  video.platforms.map((el) => el.name)
                )
              }
              background_image={video.background_image}
              genre={
                video.genre.length === 0 ? (
                  <div>No Genre Available</div>
                ) : (
                  video.genre.map((genre) => genre.name)
                )
              }
            />
          </Link>
        );
      })}
    </ul>
      <div className="pagination">
        <Paging
          allVideogames={allVideogames.length} //porque necesito la cantidad
          videogamesPerPage={videogamesPerPage}
          page={page}
          currentPage={currentPage}
        />
      </div>
      
    </div>
  );
}

export default Home;