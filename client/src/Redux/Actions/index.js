import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAME_BYID = "GET_VIDEOGAME_BYID";
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME";
export const VIDEOGAME_CREATE = "VIDEOGAME_CREATE";
export const FILTER_VIDEOGAME_GENRE = "FILTER_VIDEOGAME_GENRE";
export const FILTER_VIDEOGAME_CREATED_IN = "FILTER_VIDEOGAME_CREATED_IN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";

export function getAllVideogames() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: response.data,
    });
  };
}

export function getVideogameById(id) {
  if (id) {
    return async function (dispatch) {
      try {
        let detail = await axios.get(`http://localhost:3001/videogames/${id.id}`);
        //console.log(id.id)
        return dispatch({
          type: "GET_VIDEOGAME_BYID",
          payload: detail.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return {
    type: "RESET",
  };
}

  
  
export function cleanDetails(){
  return {
      type: 'CLEAR_DETAILS' 
  }
}




export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        "http://localhost:3001/videogames?name=" + name);
    
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: response.data,
      });
    } catch (error) {
      alert("Sorry we can not find the videogame requested 😕");
    }
  };
}

export function videogameCreate(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/videogames",
      payload
    );
    return response;
  };
}

export function filterGamesByGenre(payload) {
  return {
    type: "FILTER_BYGENRE",
    payload,
  };
}

export function filterCreatedIn(str) {
  console.log('esto es str', str);
  return {
    type: "FILTER_VIDEOGAME_CREATED_IN",
    payload: str,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
