const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;

const get02APIdetail = async (idShow) => {
    // no esta funcionando { params: { limit: 100 }}
    if(Number.isInteger(Number(idShow))){
        var apiWebINFO = await axios.get(`${API_URL}games/${idShow}?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
        // con el .then no me funciona
        return {
            id: apiWebINFO.data.id,
            name: apiWebINFO.data.name,
            released: apiWebINFO.data.released,
            rating: apiWebINFO.data.rating,
            description: apiWebINFO.data.description,
            background_image: apiWebINFO.data.background_image,
            genre: apiWebINFO.data.genres.map(el => el.name)
        };
    }  
  return { err : "El videojuego no existe" };
};

module.exports = { get02APIdetail };