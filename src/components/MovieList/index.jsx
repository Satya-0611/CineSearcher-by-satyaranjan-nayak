import { useState, useEffect, useRef } from "react";

import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import { useQueryParams } from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input, NoData, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import MovieDetails from "src/modals/MovieDetails";
import useHistoryStore from "stores/useHistoryStore";

import MovieListItem from "./MovieListItem";

import PageLoader from "../commons/PageLoader";

const MovieList = () => {
  const { queryParams, updateQueryParams } = useQueryParams();

  const queryFromUrl = queryParams.get("q") || "";
  const movieIdFromUrl = queryParams.get("movieId");

  const [searchKey, setSearchKey] = useState(queryFromUrl);
  const searchInputRef = useRef(null);
  const addToMoviesHistory = useHistoryStore(state => state.addToMoviesHistory);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKey !== queryFromUrl) {
        updateQueryParams({ q: searchKey }, "replace");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey, queryFromUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenMovie = (id, title) => {
    addToMoviesHistory(title);
    updateQueryParams({ movieId: id }, "push");
  };

  const handleCloseMovie = () => {
    updateQueryParams({ movieId: null }, "push");
  };

  const { data, isLoading, isError, error } = useShowMovies(queryFromUrl, {
    enabled: !!queryFromUrl.trim(),
    placeholderData: previousData => previousData,
    retry: false,
  });

  const movies = data?.Search || [];
  // focus input
  useEffect(() => {
    if (isError && error) Toastr.error(error.message);
  }, [isError, error]);

  if (isLoading && !movies.length && !!queryFromUrl) return <PageLoader />;

  return (
    <div className="flex h-full flex-col justify-start gap-6 px-0">
      <div className="w-full">
        <Input
          placeholder="Search for movies"
          prefix={<Search />}
          ref={searchInputRef}
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>
      {isEmpty(movies) ? (
        <NoData title="No Movies Found" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-x-2 gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map(movie => (
            <div
              className="cursor-pointer"
              key={movie.imdbID}
              onClick={() => handleOpenMovie(movie.imdbID, movie.Title)}
            >
              <MovieListItem {...movie} />
            </div>
          ))}
        </div>
      )}
      {movieIdFromUrl && (
        <MovieDetails imdbID={movieIdFromUrl} onClose={handleCloseMovie} />
      )}
    </div>
  );
};

export default MovieList;
