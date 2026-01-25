import { QUERY_KEYS } from "constants/query";

import moviesApi from "apis/movies";
import { useQuery } from "react-query";

export const useShowMovies = ({ searchKey, page, pageSize }, options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey, page, pageSize],
    queryFn: () => moviesApi.searchMovies(searchKey, page, pageSize),
    ...options,
    retry: false,
  });

export const useShowMovieDetails = imdbID =>
  useQuery({
    queryKey: [imdbID],
    queryFn: () => moviesApi.getMovieDetails(imdbID),
    enabled: !!imdbID, //to not fetch for null ids
  });
