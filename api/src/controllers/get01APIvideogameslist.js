const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;

// vamos a tratar de subir
const get01APIlist = async () => {
    // debe ser asyncronico porque no sabes cuanto tarda la api en contestar
    let apiWebINFO = [];
  
    const pageOne = await axios.get(`${API_URL}games?key=${API_KEY}&page=1`, {
      headers: { "Accept-Encoding": "identity" },
    }); // ?al colocar el page size toma un limite  de 40 ids no importa la cantidad que coloco
    const pageTwo = await axios.get(`${API_URL}games?key=${API_KEY}&page=2`, {
      headers: { "Accept-Encoding": "identity" },
    });
    const pageThree = await axios.get(`${API_URL}games?key=${API_KEY}&page=3`, {
      headers: { "Accept-Encoding": "identity" },
    });
    const pageFour = await axios.get(`${API_URL}games?key=${API_KEY}&page=4`, {
      headers: { "Accept-Encoding": "identity" },
    });
    const pageFive = await axios.get(`${API_URL}games?key=${API_KEY}&page=5`, {
      headers: { "Accept-Encoding": "identity" },
    });
  
    apiWebINFO = pageOne.data.results.concat(
      pageTwo.data.results,
      pageThree.data.results,
      pageFour.data.results,
      pageFive.data.results
    );
  
    let apiWebINFOTotal = apiWebINFO.map((video) => {
      return {
        id: video.id,
        name: video.name,
        slug: video.slug,
        released: video.released,
        rating: video.rating,
        platforms: video.platforms.map((el) => el.platform.name),
        background_image: video.background_image,
        genre: video.genres.map((el) => el.name),
      };
    });
  
    return apiWebINFOTotal;
  };

// const get01APIlist = async () => {
//     //const apiWebINFO = await axios.get(`${API_URL}games?key=${API_KEY}&page_size=100`,{headers:{'Accept-Encoding':'identity'}},{ params: { limit: 100 }})
//     const apiWebINFO = await axios.get(`${API_URL}games?key=${API_KEY}&page_size=100`,{headers:{'Accept-Encoding':'identity'}})
//     .then((res) =>
//         res.data.results.map((video) => {
//             return {
//                 id: video.id,
//                 name: video.name,
//                 slug: video.slug,
//                 released: video.released,
//                 rating: video.rating,
//                 platforms: video.platforms.map(el => el.platform.name),
//                 background_image: video.background_image,
//                 genre: video.genres.map(el => el.name)
//             };
//         })
//     );
//   return apiWebINFO;
// };

module.exports = { get01APIlist };