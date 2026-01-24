import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

const requestInterceptor = () => {
  axios.interceptors.request.use(config => {
    config.params = { ...config.params, apiKey };

    return config;
  });
};

const responseInterceptor = () => {
  axios.interceptors.response.use(response => {
    if (response.data.Response === "False") {
      // This throws the specific message: "Movie not found!" or "Too many results."
      throw new Error(response.data.Error);
    }

    return response.data;
  });
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = baseUrl;
  setHttpHeaders();
  requestInterceptor();
  responseInterceptor();
}
