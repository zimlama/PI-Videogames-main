const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  //videogameById: [],
  //videogamesByName: [],
  videogameCreate: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload, //supuestamente esto hace que los filtros empiecen sobre todos los juegos y no sobre los filtros aplicados
      };

    case "GET_GENRES":
      return {
        ...state,

        genres: action.payload,
      };

    case "GET_VIDEOGAME_BYID":
      return {
        ...state,
        videogame: action.payload,
      };

    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "VIDEOGAME_CREATE":
      return {
        ...state,
        //videogameCreate: action.json, //action.payload,
      };

    case "RESET": //VER SI CORRESPONDE
      return {
        ...state,
        videogames: [],
      };

    case "FILTER_BYGENRE":
      const allGames = state.allVideogames; // en este caso para que el filtro arranque de todos
      /*const genresFilter = allGames.filter((e) => {
        if (e.genre) {
          const genres = e.genre;
          return genres.includes(action.payload);
        }
      });
      return {
        ...state,
        videogames: action.payload === "All" ? allGames : genresFilter,
      };*/

      // const allVideogames = state.allVideogames
      const genresFilter =
        action.payload === "All"
          ? allGames
          : allGames.filter((el) =>
              el.genre?.some((e) => e.includes(action.payload))
            );
      console.log(genresFilter);
      return {
        ...state,
        videogames: genresFilter,
      };

    /*const genresFilter =
        action.payload === "All"
          ? state.allVideogames
          : allGames.filter((el) => {
            /*  return el.genres.find((el) => { //aca retornaria solo el primero
                return el.name === action.payload;*/
    //      return el.genres === action.payload;
    //    });

    // return { ...state, videogames: genresFilter };

    case "FILTER_VIDEOGAME_CREATED_IN":
      const filterCreatedIn =
        action.payload === "Created"
          ? state.allVideogames.filter((el) => el.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : filterCreatedIn,
      };

    case "ORDER_BY_NAME":
      let sortGame =
        action.payload === "Asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortGame,
      };

    case "ORDER_BY_RATING":
      let sortByRating =
        action.payload === "Low"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortByRating,
      };

    default:
      return state;
  }
}