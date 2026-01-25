import { useHistory, useLocation } from "react-router-dom";
import { buildUrl } from "src/utils/url";

export const useQueryParams = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const updateQueryParams = (newParams, action = "push") => {
    const currentParams = Object.fromEntries(
      new URLSearchParams(location.search)
    );

    const mergedParams = { ...currentParams, ...newParams };

    const url = buildUrl(location.pathname, mergedParams);

    // 4. Navigate
    if (action === "replace") {
      history.replace(url);
    } else {
      history.push(url);
    }
  };

  return { queryParams, updateQueryParams };
};
