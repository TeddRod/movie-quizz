const axios = require("axios");
const { base_url, api_key } = require("../config/config.js");

module.exports = {
  getPopularTvShows() {
    return axios
      .get(`${base_url}/tv/popular?api_key=${api_key}`)
      .then((response) => response.data.results)
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Erreur au chargement des tv shows !" });
      });
  },

  getMovies() {
    return axios
      .get(`${base_url}/movie/popular?api_key=${api_key}`)
      .then((response) => response.data.results)
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Erreur au chargement des movies !" });
      });
  },
};
