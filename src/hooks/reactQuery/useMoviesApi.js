import { QUERY_KEYS } from "constants/query";

import movies from "apis/movies";
import { useQuery, keepPreviousData } from "react-query";

export const useShowMovies = (
  { searchKey, page, pageSize, year, type },
  options = {}
) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey, page, pageSize, year, type],
    queryFn: () => movies.searchMovies(searchKey, page, pageSize, year, type),
    placeholderData: keepPreviousData,
    retry: false,
    enabled: !!searchKey.trim(),
    ...options,
  });

export const useShowMovieDetails = imdbID =>
  useQuery({
    queryKey: [imdbID],
    queryFn: () => movies.getMovieDetails(imdbID),
    enabled: !!imdbID, //to not fetch for null ids
  });
