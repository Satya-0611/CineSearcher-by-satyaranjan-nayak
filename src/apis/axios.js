import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { OMDB_API, OMDB_API_KEY } from "src/constants";

const requestInterceptor = () => {
  axios.interceptors.request.use(config => {
    config.params = { ...config.params, apiKey: OMDB_API_KEY };

    return config;
  });
};

const showErrorToastr = errorMessage => {
  if (errorMessage === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else {
    Toastr.error(errorMessage);
  }
};

const responseInterceptor = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data.Response === "False") {
        console.log(response.data.Error);
        showErrorToastr(response.data.Error);
      }

      return camelcaseKeys(response.data, {
        deep: true,
        preserveConsecutiveUppercase: true,
      });
    },
    error => {
      showErrorToastr(error.message);
    }
  );
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
