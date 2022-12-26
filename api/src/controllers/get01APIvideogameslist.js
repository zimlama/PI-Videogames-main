const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;

const get01APIlist = async () => {
    const apiWebINFO = await axios.get(`${API_URL}games?key=${API_KEY}&page_size=100`,{headers:{'Accept-Encoding':'identity'}},{ params: { limit: 100 }})
    .then((res) =>
        res.data.results.map((video) => {
            return {
                id: video.id,
                name: video.name,
                slug: video.slug,
                released: video.released,
                rating: video.rating,
                platforms: video.platforms.map(el => el.platform.name),
                background_image: video.background_image,
                genre: video.genres.map(el => el.name)
            };
        })
    );
  return apiWebINFO;
};

module.exports = { get01APIlist };