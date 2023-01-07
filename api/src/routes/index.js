const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// *Esta es la version cuando solo mostramos todos los videojuegos (en el nuevo codigo permiter search name y mostras todos los videojuegos)
const get01videogameslistsearch = require('../controllers/get01videogameslistsearch');
const get02videogamedetail = require('../controllers/get02videogamedetail');
const get03genrelist = require('../controllers/get03genrelist');
const post01createvideogame = require('../controllers/post01createvideogame');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", get01videogameslistsearch.get01listsearch);

router.get("/videogames/:id", get02videogamedetail.get02detail);

router.get("/genres", get03genrelist.get03list);

router.post("/videogames", post01createvideogame.post01create);

module.exports = router;
