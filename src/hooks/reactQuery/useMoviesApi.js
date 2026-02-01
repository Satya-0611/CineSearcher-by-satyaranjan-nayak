import { QUERY_KEYS } from "constants/query";

import movies from "apis/movies";
import { useQuery, keepPreviousData } from "react-query";

export const useShowMovies = (params, options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => movies.searchMovies(params),
    placeholderData: keepPreviousData,
    retry: false,
    enabled: !!params?.s?.trim(),
    ...options,
  });

export const useShowMovieDetails = imdbID =>
  useQuery({
    queryKey: [imdbID],
    queryFn: () => movies.getMovieDetails(imdbID),
    enabled: !!imdbID, //to not fetch for null ids
  });
