// nota el codigo de get03 usa el codigo del get01 para generar una lista y adicionar la lista
const { get03APIlistsearch } = require("./get03APIvideogameslistsearch");
const { get03DBlistsearch } = require("./get03DBvideogameslistsearch");
const get03listsearch = async (nameS) =>{
    const get03APIvideogameslistsearch = await get03APIlistsearch(nameS);
    const get03DBvideogameslistsearch = await get03DBlistsearch(nameS);
    const get03APIyDBall = get03DBvideogameslistsearch.concat(get03APIvideogameslistsearch);
    return get03APIyDBall
  }

module.exports = { get03listsearch };