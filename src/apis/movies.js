import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

const searchMovies = searchKey => {
  const url = `${baseUrl}/?s=${searchKey}&apiKey=${apiKey}`;
  console.log(searchKey);

  return axios.get(url);
};

const moviesApi = { searchMovies };

export default moviesApi;
