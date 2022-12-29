require('dotenv').config(); //primeromejor traer el axios
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; 
const { Videogame, Genre } = require('../db'); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?


const { get01DBlist } = require("./get01DBvideogameslist");

const get02DBdetail = async (idShow) => {
    const videogameslist = await get01DBlist();
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let uuidCheck = "" + idShow;
    if(Number.isInteger(Number(idShow))){
        const videogameMatchName = await videogameslist.filter((el) => el.id.includes(idShow));
        return videogameMatchName;
    } else if(regexExp.test(uuidCheck)){
        const videogameMatchName = await videogameslist.filter((el) => el.id.includes(idShow));
        return videogameMatchName;
    } else {
        const videogameNOinfo = [];
        return videogameNOinfo;
    }
};

module.exports = { get02DBdetail };