const axios = require("axios");
require("dotenv").config()
const { API_KEY, API_URL } = process.env;
const { Genre } = require('../db.js')

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

const get04APIgenres = async () => {
    const apiWebINFO = await axios.get(`${API_URL}genres?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
    .then((res) =>
        res.data.results.map((el) => {
            return {
                name: el.name, 
            };
        })
    );
    apiWebINFO.forEach(el => { 
        Genre.findOrCreate({
            where: {name: el.name}
        })
    })
    return apiWebINFO;
};

module.exports = { get04APIgenres };