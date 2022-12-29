const { get02APIdetail } = require("./get02APIvideogamedetail");
const { get02DBdetail } = require("./get02DBvideogamedetail");

const get02videogamedetail = async (idDet) =>{
    const get02APIvideogamedetail = await get02APIdetail(idDet);
    const get02DBvideogamedetail = await get02DBdetail(idDet);
    const get01APIyDBall = get02DBvideogamedetail.concat(get02APIvideogamedetail);
    return get01APIyDBall;
  }

module.exports = { get02videogamedetail };