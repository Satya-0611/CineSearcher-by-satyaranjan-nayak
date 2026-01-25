import axios from "axios";

const searchMovies = (searchKey, page, pageSize) =>
  axios.get("/", { params: { s: searchKey, page, page_size: pageSize } });

const getMovieDetails = imdbID => axios.get("/", { params: { i: imdbID } });

const moviesApi = { searchMovies, getMovieDetails };

export default moviesApi;
