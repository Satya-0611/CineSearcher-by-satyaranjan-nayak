import { BASE_URL } from "constants";

import axios from "axios";

const searchMovies = params => axios.get(BASE_URL, { params });

const getMovieDetails = imdbID =>
  axios.get(BASE_URL, { params: { i: imdbID } });

const movies = { searchMovies, getMovieDetails };

export default movies;
