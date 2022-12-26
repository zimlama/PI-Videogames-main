const { get02APIdetail } = require("./get02APIvideogamedetail");
const { get02DBdetail } = require("./get02DBvideogamedetail");

const get02videogamedetail = async (idDet) =>{
    const get02APIvideogamedetail = await get02APIdetail(idDet);
    // const get02DBvideogamedetail = await get02DBdetail();
    //const get01APIyDBall = get01APIvideogameslist.concat(get02DBvideogamedetail);
    return get02APIvideogamedetail;
  }

module.exports = { get02videogamedetail };