const { get04APIgenres } = require("./get04APIgenrelist");
const { get04DBgenres } = require("./get04DBgenrelist");

const get04genrelist = async () =>{
    const get04APIgenrelist = await get04APIgenres();
    // const get04DBgenrelist = await get04DBgenres();
    //const get04APIyDBall = get04APIgenrelist.concat(get04DBgenrelist);
    return get04APIgenrelist;
  }

module.exports = { get04genrelist };