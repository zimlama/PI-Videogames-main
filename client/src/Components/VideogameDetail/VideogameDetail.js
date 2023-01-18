import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById, cleanDetails } from "../../Redux/Actions/index";
import { useEffect } from "react";


function VideogameDetail(id) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.videogameDetail);


  useEffect(() => {
    dispatch(getVideogameById(id));
    return function () {
      dispatch(cleanDetails());
    };
  }, [id, dispatch]);

  return (
    <div>
      {detail && detail[0] ? (
        <div>
          <button>
            <Link className="linkBack" to="/home">
              Home
            </Link>
          </button>
          <div>
            <div>
              <h1>{detail[0].name}</h1>
              <p>
                <h2>Description:</h2>{" "}
                {detail[0].description.replace(/<p>/g, "")}
              </p>
            </div>
            <div>
              <img src={detail[0].background_image} alt="logoimg" />
              <div>
                <h4>Rating: {detail[0].rating}</h4>
                <br />
                <h4>Released: {detail[0].released}</h4>
                <ul>Genre: {detail[0].genre && detail[0].genre.map((gen) => <li>{gen}</li>)}</ul>
                <ul>Platforms: {detail[0].platforms && detail[0].platforms.map((pla) => <li>{pla.platform.name}</li>)}</ul>;
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default VideogameDetail;
