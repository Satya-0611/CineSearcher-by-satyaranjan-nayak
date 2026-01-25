import { useState, useEffect, useRef } from "react";

import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import { useQueryParams } from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { Input, NoData, Toastr, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import MovieDetails from "src/modals/MovieDetails";
import useHistoryStore from "stores/useHistoryStore";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import MovieListItem from "./MovieListItem";

import PageLoader from "../commons/PageLoader";

const MovieList = () => {
  const { queryParams, updateQueryParams } = useQueryParams();
  const { t } = useTranslation();

  const queryFromUrl = queryParams.get("q") || "";
  const page = Number(queryParams.get("page") || DEFAULT_PAGE_INDEX);
  const pageSize = Number(queryParams.get("page_size") || DEFAULT_PAGE_SIZE);
  const movieIdFromUrl = queryParams.get("movie_id");

  const [searchKey, setSearchKey] = useState(queryFromUrl);
  const searchInputRef = useRef(null);
  const addToMoviesHistory = useHistoryStore(state => state.addToMoviesHistory);

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKey !== queryFromUrl) {
        updateQueryParams(
          {
            q: searchKey,
            page: DEFAULT_PAGE_INDEX,
          },
          "replace"
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey, queryFromUrl]); // eslint-disable-line

  const handleOpenMovie = (id, title) => {
    addToMoviesHistory(title);
    updateQueryParams({ movieId: id }, "push");
  };

  const handleCloseMovie = () => {
    updateQueryParams({ movieId: "" }, "push");
  };

  const { data, isLoading, isError, error } = useShowMovies({
    searchKey: queryFromUrl,
    page,
    pageSize,
  });

  const movies = data?.Search || [];
  const totalResults = data?.totalResults || 0;

  const handlePageNavigation = newPage => {
    updateQueryParams({ page: newPage }, "push");
  };

  useEffect(() => {
    if (isError && error) Toastr.error(error.message);
  }, [isError, error]);

  if (isLoading && !movies.length && !!queryFromUrl) return <PageLoader />;

  return (
    <div className="flex h-full flex-col justify-start gap-6 px-0">
      <div className="w-full">
        <Input
          placeholder={t("searchInputPlaceholder")}
          prefix={<Search />}
          ref={searchInputRef}
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>
      {isEmpty(movies) ? (
        <NoData title={t("noMovies")} />
      ) : (
        <>
          {" "}
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
          {/* Pagination */}
          <div className="mb-8 flex justify-end px-4">
            <Pagination
              count={totalResults}
              navigate={handlePageNavigation}
              pageNo={page}
              pageSize={pageSize}
            />
          </div>
        </>
      )}
      {movieIdFromUrl && (
        <MovieDetails imdbID={movieIdFromUrl} onClose={handleCloseMovie} />
      )}
    </div>
  );
};

export default MovieList;
