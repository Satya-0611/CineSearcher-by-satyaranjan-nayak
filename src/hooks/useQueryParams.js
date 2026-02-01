import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useHistory, useLocation } from "react-router-dom";
import { buildUrl } from "src/utils/url";

export const useQueryParams = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = keysToCamelCase(
    parse(location.search, { ignoreQueryPrefix: true })
  );

  const updateQueryParams = (newParams, action = "push") => {
    const currentParams = parse(location.search, { ignoreQueryPrefix: true });

    const mergedParams = { ...currentParams, ...newParams };

    const url = buildUrl(location.pathname, mergedParams);

    if (action === "replace") {
      history.replace(url);
    } else {
      history.push(url);
    }
  };

  return { queryParams, updateQueryParams };
};
