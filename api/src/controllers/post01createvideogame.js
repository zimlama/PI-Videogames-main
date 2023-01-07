const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { Videogame, Genre } = require('../db');

// - [ ]  POST /videogames:
//     - [ ]  Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//     - [ ]  Crea un videojuego en la base de datos, relacionado a sus géneros.

async function post01create(req, res, next){
    try{
        const {
            name,
            slug,
            description,
            released,
            rating,
            platforms,
            background_image,
            createdInDb,
            genre,
        } = req.body;
        if (!name || !description || !platforms){
            return res.status(400).send({ message: "information required" });
        };
        let videogameCreated = await Videogame.create({
            name,
            slug,
            description,
            released,
            rating,
            platforms,
            background_image,
            createdInDb,
        });
        let genreDb = await Genre.findAll({
            where: { name: genre },
        });
        await videogameCreated.addGenre(genreDb);
        res.status(200).send("Videogame created");
    } catch(err){
        next(err);
    }
};

  module.exports = { post01create };
