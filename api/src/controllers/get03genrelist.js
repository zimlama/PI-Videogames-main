const axios = require("axios");
require("dotenv").config();
const { Genre } = require('../db');

// - [x]  GET /genres:
//     - [x]  Obtener todos los tipos de géneros de videojuegos posibles
//     - [x]  En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
//          - [x]  Se realizo en get01videogameslistsearch.js

async function get03list(req, res, next){
    try{
        // ---------------
        // Init  -> Get info DB
        const getDBlist = await Genre.findAll();
        const get01DBlist = [];
        getDBlist.map(el => {
            get01DBlist.unshift(
        
                    el.dataValues.name,
            );
        });
        if(get01DBlist.length){
            return res.status(200).json(get01DBlist);
        }
        return res.status(404).json({ err : "Not found genres list" });
        // End  -> Get info DB
        // ---------------
    } catch(err){
        next(err);
    }
}


module.exports = { get03list };