import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById, cleanDetails } from "../../Redux/Actions/index";
import { useEffect } from "react";
// import "./VideogameDetail.css";

function VideogameDetail(id) {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.videogameDetail)
  console.log(detail.name);
  

  useEffect(() => {
    dispatch(getVideogameById(id));
    return function () {
      dispatch(cleanDetails());
    }
  },[id, dispatch]);

  

// function alertaTest(){
//   alert('Hola ID:', detail)
// }

// return(
//   // alertaTest()
// )

  return (
    <div >
            {
                detail && detail[0] ?
                <div>
                    <button ><Link className="linkBack" to='/home'>Home</Link></button>
                    <div >
                        <div >
                            <h1>{detail[0].name}</h1>
                            <p><h2>Description:</h2> {detail[0].description.replace(/<p>/g, "")}</p>
                        </div>
                        <div >
                            <img src={detail[0].background_image} alt="logoimg" />
                            <div >
                                {/* <h3>Platforms: {detail.platforms.length > 0 ? detail.platforms + ' ': detail.platforms.map(e => e)}</h3> */}
                                <br />
                                {/* <h3>Genres: {detail.genre.length > 0 ? detail.genre + ' ': detail.genre.map(e => e)}</h3> */}
                                <br />
                                <h4>Rating: {detail[0].rating}</h4>
                                <br />
                                <h4>Released: {detail[0].released}</h4>
                            </div>
                        </div>
                    </div>
                </div> :  (
                    <div>
                      <p>Loading...</p >  
                    </div>
                )
            }
        </div>
    )
}

export default VideogameDetail;
