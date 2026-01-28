import axios from "axios";

const searchMovies = (searchKey, page, pageSize, year, type) =>
  axios.get("/", {
    params: { s: searchKey, page, page_size: pageSize, y: year, type },
  });

const getMovieDetails = imdbID => axios.get("/", { params: { i: imdbID } });

const moviesApi = { searchMovies, getMovieDetails };

export default moviesApi;
