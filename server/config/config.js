const axios = require('axios');

const service = axios.get;
const api_key = process.env.TMDB_KEY;

const base_url = "https://api.themoviedb.org/3";

module.exports = {service, api_key, base_url};