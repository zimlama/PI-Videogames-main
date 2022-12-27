const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// *Esta es la version cuando solo mostramos todos los videojuegos (en el nuevo codigo permiter search name y mostras todos los videojuegos)
const { get01videogameslist } = require('../controllers/get01videogameslist');
const { get02videogamedetail } = require('../controllers/get02videogamedetail');
//const { get03APIlistsearch } = require('../controllers/get03APIvideogameslistsearch');
const { get04genrelist } = require('../controllers/get04genrelist');
const { Genre, Videogame } = require("../db.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// esta usar el controlador ../controllers/get01APIvideogameslist.js
router.get("/videogames", async (req, res) => {
    // *Esta es la version cuando solo mostramos todos los videojuegos (en el nuevo codigo permiter search name y mostras todos los videojuegos)
    // try {
    //     let getALLvideogameslist = await get01videogameslist();
    //     res.status(200).json(getALLvideogameslist);
    // } catch (err) {
    //     console.log(err);
    // }
    try{
        const name = req.query.name;
        //const listsearch = await get03APIlistsearch(name);
        const listsearch = await get01videogameslist(name);
        if(listsearch.length){
            return res.status(200).json(listsearch.slice(0,14));
        }
        return res.status(404).send("No se encuentra el videojuego requerido");
    } catch (err){
        console.log(err);
    }
});

// esta usar el controlador ../controllers/get02APIvideogamedetail.js
router.get("/videogames/:id", async (req, res) => {
    const idShow = req.params.id;
    console.log('esto que es: ', idShow)
    try {
        let video = await get02videogamedetail(idShow);
        res.status(200).json(video);
    } catch (err) {
        console.log(err);
    }
});

// esta usar el controlador ../controllers/get04APIgenrelist.js
router.get("/genres", async (req, res) => {
    try {
      let getGenres = await get04genrelist();
      res.status(200).json(getGenres);
    } catch (err) {
      console.log(err);
    }
  });

router.post("/videogames", async (req, res) => {
    try {
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
        if (!name || !description || !platforms)
        return res.status(400).send({ message: "information required" });
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
        res.status(200).send("Videogame creado con exito");
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
  });
  

module.exports = router;
