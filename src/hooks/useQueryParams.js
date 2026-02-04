import { keysToCamelCase } from "neetocist";
import { Toastr } from "neetoui";
import { parse } from "qs";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { buildUrl } from "src/utils/url";

const useQueryParams = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const queryParams = keysToCamelCase(
    parse(location.search, { ignoreQueryPrefix: true })
  );

  const updateQueryParams = newParams => {
    const currentParams = parse(location.search, { ignoreQueryPrefix: true });

    const mergedParams = { ...currentParams, ...newParams };

    if (mergedParams.q === undefined && mergedParams?.q?.trim() !== "") {
      Toastr.error(t("errorMessages.noSearchKey"));
    } else {
      const url = buildUrl(location.pathname, mergedParams);
      history.push(url);
    }
  };

  return { queryParams, updateQueryParams };
};

export default useQueryParams;
