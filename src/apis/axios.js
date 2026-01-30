import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { OMDB_API, OMDB_API_KEY } from "src/constants";

const requestInterceptor = () => {
  axios.interceptors.request.use(config => {
    config.params = { ...config.params, apiKey: OMDB_API_KEY };

    return config;
  });
};

const responseInterceptor = () => {
  axios.interceptors.response.use(response => {
    if (response.data.Response === "False") {
      throw new Error(response.data.Error);
    }

    return camelcaseKeys(response.data, {
      deep: true,
      preserveConsecutiveUppercase: true,
    });
  });
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL = OMDB_API;
  setHttpHeaders();
  requestInterceptor();
  responseInterceptor();
}
