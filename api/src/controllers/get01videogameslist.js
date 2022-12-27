const { get01APIlist } = require("./get01APIvideogameslist");
const { get01DBlist } = require("./get01DBvideogameslist");
const { get03APIlistsearch} = require("./get03APIvideogameslistsearch");
const get01videogameslist = async (nameS) =>{
    const get03APIvideogameslistsearch = await get03APIlistsearch(nameS);
    const get01DBvideogameslist = await get01DBlist();
    const get01APIyDBall = get01DBvideogameslist.concat(get03APIvideogameslistsearch);
    return get01APIyDBall
  }

module.exports = { get01videogameslist };