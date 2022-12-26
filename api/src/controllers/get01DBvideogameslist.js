require('dotenv').config(); //primeromejor traer el axios
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; 

const { Videogame, Genre } = require('../db'); // es necesario traer los modelos directos de su carpeta o con traerlos de la db ya estaria?


// Traigo info de mi base de datos

const get01DBlist = async () => {
    return await Videogame.findAll({ 
        include: {
            model: Genre,
            attributes: ['name'], //aca va lo unico que quiero igualmentente no hay mas
            through: {
                attributes: []
            }
        }

    })
}

module.exports = { get01DBlist };    