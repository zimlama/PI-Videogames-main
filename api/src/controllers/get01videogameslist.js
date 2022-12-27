// nota: esto solo muestra la lista, nbo realiza la busqueda
const { get01APIlist } = require("./get01APIvideogameslist");
const { get01DBlist } = require("./get01DBvideogameslist");
const get01videogameslist = async (nameS) =>{
    const get01APIvideogameslist = await get01APIlist();
    const get01DBvideogameslist = await get01DBlist();
    const get01APIyDBall = get01DBvideogameslist.concat(get01APIvideogameslist);
    return get01APIyDBall
  }

module.exports = { get01videogameslist };