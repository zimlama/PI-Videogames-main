const { get01APIlist } = require("./get01APIvideogameslist");
const { get01DBlist } = require("./get01DBvideogameslist");
const { get03APIlistsearch} = require("./get03APIvideogameslistsearch");
const get01videogameslist = async () =>{
    const get03APIvideogameslistsearch = await get03APIlistsearch();
    const get01DBvideogameslist = await get01DBlist();
    const get01APIyDBall = get03APIvideogameslistsearch.concat(get01DBvideogameslist);
    return get01APIyDBall
  }

module.exports = { get01videogameslist };