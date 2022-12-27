require('dotenv').config(); //primeromejor traer el axios
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; 
const { Videogame, Genre } = require('../db'); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?


const { get01DBlist } = require("./get01DBvideogameslist");

const get03DBlistsearch = async (name) => {
    const videogameslist = await get01DBlist();
    if(name){
        newName = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "").replace(/' '/g, "-").toLowerCase();
        const videogameMatchName = await videogameslist.filter((el) => el.slug.includes(newName));
        //console.log('esto es videogameMatchName: ', videogameMatchName);
        return videogameMatchName;
    } else {
        return videogameslist;
    }
};

module.exports = { get03DBlistsearch };