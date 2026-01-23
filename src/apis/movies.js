import axios from "axios";

const searchMovies = searchKey => {
  console.log(searchKey);

  return axios.get("/", { params: { s: searchKey } });
};

const moviesApi = { searchMovies };

export default moviesApi;
