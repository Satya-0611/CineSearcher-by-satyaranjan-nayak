import { BASE_URL } from "constants";

import axios from "axios";

const searchMovies = (searchKey, page, pageSize, year, type) =>
  axios.get(BASE_URL, {
    params: { s: searchKey, page, page_size: pageSize, y: year, type },
  });

const getMovieDetails = imdbID =>
  axios.get(BASE_URL, { params: { i: imdbID } });

const movies = { searchMovies, getMovieDetails };

export default movies;
