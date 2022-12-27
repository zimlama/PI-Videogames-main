const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;

const { get01APIlist } = require("./get01APIvideogameslist");

const get03APIlistsearch = async (name) => {
    const videogameslist = await get01APIlist();
    if(name){
        newName = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "").replace(' ', "-").toLowerCase();
        const videogameMatchName = await videogameslist.filter((el) => el.slug.includes(newName));
        return videogameMatchName;
    } else {
        return videogameslist;
    }
};

module.exports = { get03APIlistsearch };