const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Videogame, Genre } = require('../db');

// - [x]  GET /videogame/{idVideogame}:
//     - [x]  Obtener el detalle de un videojuego en particular
//     - [x]  Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//     - [x]  Incluir los géneros asociados

async function get02detail(req, res, next){
  try{
    // ---------------
    // Init -> Videogame Detail API -> Get info API RAWG
    const getAPIdetail = [];
    const idShow = req.params.id;
    if(Number.isInteger(Number(idShow))){
      var apiWebINFO = await axios.get(`${API_URL}games/${idShow}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}});
      getAPIdetail.unshift({
        id: apiWebINFO.data.id,
        name: apiWebINFO.data.name,
        released: apiWebINFO.data.released,
        rating: apiWebINFO.data.rating,
        description: apiWebINFO.data.description,
        background_image: apiWebINFO.data.background_image,
        genre: apiWebINFO.data.genres.map(el => el.name)
      });
      return res.status(200).json(getAPIdetail);
    }
    // End -> Videogame Detail API
    // ---------------
    // Init  -> Get info DB
    let get02DBdetail = [];
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let uuidCheck = "" + idShow;
    if(regexExp.test(uuidCheck)){
      const getDBdetail = await Videogame.findAll({ 
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });
      await getDBdetail.map(el => {
        get02DBdetail.unshift({
          id: el.dataValues.id,
          name: el.dataValues.name,
          slug: el.dataValues.slug,
          description: el.dataValues.description,
          released: el.dataValues.released,
          rating: el.dataValues.rating,
          platforms: el.dataValues.platforms.map((elp) => elp.name),
          background_image: el.dataValues.background_image,
          genre: el.dataValues.genres.map((eln) => eln.name),
        });
      });
      const videogameMatchName = await get02DBdetail.filter((el) => el.id.includes(uuidCheck));
      return res.status(200).json(videogameMatchName);
    }
    // End  -> Get info DB
    // ---------------
    return res.status(404).json({ err : "Not found ID of videogame" });
  } catch(err){
    next(err);
  }
};

module.exports = { get02detail };