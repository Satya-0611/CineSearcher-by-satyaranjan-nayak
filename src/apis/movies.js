import axios from "axios";

const searchMovies = searchKey => axios.get("/", { params: { s: searchKey } });

const getMovieDetails = imdbID => axios.get("/", { params: { i: imdbID } });

const moviesApi = { searchMovies, getMovieDetails };

export default moviesApi;
