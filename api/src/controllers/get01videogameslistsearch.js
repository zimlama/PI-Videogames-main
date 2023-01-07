const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Videogame, Genre } = require('../db');

// - [x]  Create DB /genres:
//     - [x]  Crear base de datos de generos
// - [x]  GET /videogames:
//     - [x]  Obtener un listado de los videojuegos
//         - [x]  todo los videojuegos 100 videojuegos
// - [ ]  GET /videogames?name="...":
//     - [x]  Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//     - [x]  Si no existe ningún videojuego mostrar un mensaje adecuado

async function get01listsearch(req, res, next){
    try{
        // ---------------
        // Init -> Genre API -> Get info API RAWG
        const genreDBlist = await Genre.findAll();
        if(genreDBlist.length != 19){
            const apiWebINFOgenre = await axios.get(`${API_URL}genres?key=${API_KEY}`,{headers:{'Accept-Encoding':'identity'}})
            .then(
                (res) => res.data.results.map((el) => {
                    return {
                        name: el.name,
                    };
                })
            );
            // End -> Genre API
            // Init -> Genre DB
            await apiWebINFOgenre.forEach(el => { 
                Genre.findOrCreate({
                    where: {name: el.name}
                })
            });
        }
        // End -> Genre DB
        // ---------------
        // Init -> Videogame API -> Get info API RAWG
        let apiWebINFO = [];
        let page = [];
        for(let i = 1; i <= 5; i++){
            page = await axios.get(`${API_URL}games?key=${API_KEY}&page=${i}`, {
                headers: { "Accept-Encoding": "identity" },
            });
            apiWebINFO = apiWebINFO.concat(page.data.results);
        }
        const get01APIlist = await apiWebINFO.map((video) => {
            return {
                id: video.id,
                name: video.name,
                slug: video.slug,
                released: video.released,
                rating: video.rating,
                platforms: video.platforms.map((el) => el.platform.name),
                background_image: video.background_image,
                genre: video.genres.map((el) => el.name),
            };
        });
        // End -> Videogame API
        // ---------------
        // Init  -> Get info DB
        const getDBlist = await Videogame.findAll({ 
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        get01DBlist = [];
        await getDBlist.map(el => {
            get01DBlist.unshift(
                {
                    id: el.dataValues.id,
                    name: el.dataValues.name,
                    slug: el.dataValues.slug,
                    released: el.dataValues.released,
                    rating: el.dataValues.rating,
                    platforms: el.dataValues.platforms.map((elp) => elp.name),
                    background_image: el.dataValues.background_image,
                    genre: el.dataValues.genres.map((eln) => eln.name),
            });
        });
        // End  -> Get info DB
        // ---------------
        // Init  -> Show alls videogames match with the name or Show all list
        const get01APIandDBlist = get01DBlist.concat(get01APIlist);
        const searchName = req.query.name;
        if(!searchName){
            return res.status(200).json(get01APIandDBlist);   
        } 
        newName = searchName.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "").replace(' ', "-").toLowerCase();
        const videogameMatchName = await get01APIandDBlist.filter((el) => el.slug.includes(newName));
        if(videogameMatchName.length){
            return res.status(200).json(videogameMatchName.slice(0,14));
        }
        return res.status(404).json({ err : "Not found videogame" });
        // End  -> Show alls videogames match with the name or Show all list
    } catch(err){
        next(err);
    }
}

module.exports = { get01listsearch };