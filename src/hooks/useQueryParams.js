import { useHistory, useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const updateQueryParams = (newParams, action = "push") => {
    const currentParams = new URLSearchParams(location.search);

    Object.keys(newParams).forEach(key => {
      if (newParams[key]) {
        currentParams.set(key, newParams[key]);
      } else {
        currentParams.delete(key);
      }
    });

    const searchString = currentParams.toString();

    if (action === "replace") {
      history.replace({ search: searchString });
    } else {
      history.push({ search: searchString });
    }
  };

  return { queryParams, updateQueryParams };
};
