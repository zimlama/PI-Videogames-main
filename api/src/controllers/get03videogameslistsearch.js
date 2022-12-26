const { get03APIlistsearch } = require("./get03APIvideogameslistsearch");
const { get03DBlistsearch } = require("./get03DBvideogameslistsearch");

const get03videogameslistsearch = async (nameSearch) =>{
    const get03APIvideogameslistsearch = await get03APIlistsearch(nameSearch);
    // const get03DBvideogameslistsearch = await get03DBlistsearch(nameSearch);
    //const get03APIyDBall = get03APIvideogameslistsearch.concat(get03DBvideogameslistsearch);
    return get03APIvideogameslistsearch;
  }

module.exports = { get03videogameslistsearch };