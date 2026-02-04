import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { t } from "i18next";
import { serializeKeysToSnakeCase } from "neetocist";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import { OMDB_API, OMDB_API_KEY } from "src/constants";

const requestInterceptor = () => {
  axios.interceptors.request.use(config => {
    const newConfig = evolve(
      { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
      config
    );

    newConfig.params = {
      ...newConfig.params,
      apiKey: OMDB_API_KEY,
    };

    return newConfig;
  });
};

const showErrorToastr = errorMessage => {
  if (errorMessage === t("errorMessages.networkError")) {
    Toastr.error(t("errorMessages.noInternetConnection"));
  } else {
    Toastr.error(errorMessage);
  }
};

const responseInterceptor = () => {
  axios.interceptors.response.use(
    response => {
      if (response.data.Response === "False") {
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
