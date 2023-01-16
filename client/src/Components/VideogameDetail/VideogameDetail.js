import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById, cleanDetail } from "../../Redux/Actions/index";
import { useEffect } from "react";
import "./VideogameDetail.css";

function VideogameDetail(id) {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.getVideogameById)
  

  useEffect(() => {
    dispatch(getVideogameById(id));
  },[id, dispatch]);

  useEffect(() => {
    return function () {
      dispatch(cleanDetail());
    } 
  },[dispatch]);

// function alertaTest(){
//   alert('Hola ID:', detail)
// }

// return(
//   // alertaTest()
// )

  return (
    <div >
            {
                detail && detail.name ?
                <div>
                    <button ><Link className="linkBack" to='/home'>Home</Link></button>
                    <div >
                        <div >
                            <h1>{detail.name}</h1>
                            <p><h2>Description:</h2> {detail.description.replace(/<p>/g, "")}</p>
                        </div>
                        <div >
                            <img src={detail.background_image} alt="logoimg" />
                            <div >
                                <h3>Platforms: {detail.platforms.length > 0 ? detail.platforms + ' ': detail.platforms.map(e => e)}</h3>
                                <br />
                                <h3>Genres: {detail.genre.length > 0 ? detail.genre + ' ': detail.genre.map(e => e)}</h3>
                                <br />
                                <h4>Rating: {detail.rating}</h4>
                                <br />
                                <h4>Released: {detail.released}</h4>
                            </div>
                        </div>
                    </div>
                </div> : (
                    <div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default VideogameDetail;
