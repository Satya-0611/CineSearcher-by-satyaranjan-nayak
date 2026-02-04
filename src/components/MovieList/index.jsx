import { useState, useEffect } from "react";

import MovieDetails from "components/MovieList/Details";
import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import useKeyboardNavigation from "hooks/useKeyboardNavigation";
import useQueryParams from "hooks/useQueryParams";
import { Filter, Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useHistoryStore from "stores/useHistoryStore";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import FilterUI from "./Filter";
import MovieListItem from "./Item";

import PageLoader from "../commons/PageLoader";

const MovieList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useKeyboardNavigation();
  const { addToMoviesHistory } = useHistoryStore.pick();
  const { queryParams, updateQueryParams } = useQueryParams();
  const { t } = useTranslation();
  const {
    q: queryFromUrl,
    movieId: movieIdFromUrl,
    pageSize = DEFAULT_PAGE_SIZE,
    year: yearFromUrl,
    type: typeFromUrl,
  } = queryParams;
  const page = Number(queryParams.page) || DEFAULT_PAGE_INDEX;

  const [searchKey, setSearchKey] = useState(queryFromUrl);
  const debouncedSearchKey = useDebounce(searchKey);

  useEffect(() => {
    if (debouncedSearchKey !== queryFromUrl) {
      updateQueryParams({
        q: debouncedSearchKey,
        page: DEFAULT_PAGE_INDEX,
      });
    }
  }, [queryFromUrl, debouncedSearchKey, updateQueryParams]);

  const handleOpenMovie = (id, title) => {
    addToMoviesHistory(title);
    updateQueryParams({ movieId: id });
  };

  const handleCloseMovie = () => {
    updateQueryParams({ movieId: "" });
  };

  const { data = {}, isLoading } = useShowMovies({
    s: queryFromUrl?.trim(),
    page,
    pageSize,
    y: yearFromUrl,
    type: typeFromUrl,
  });

  const movies = data?.search || [];
  const totalResults = data?.totalResults || 0;

  const handlePageNavigation = newPage => {
    updateQueryParams({ page: newPage });
  };

  if (isLoading && isEmpty(movies) && !!queryFromUrl) return <PageLoader />;

  return (
    <div className="flex h-full flex-col justify-start gap-6 px-0">
      <div className="flex w-full gap-3">
        <Input
          placeholder={t("searchInputPlaceholder")}
          prefix={<Search />}
          ref={searchInputRef}
          value={searchKey}
          onChange={({ target: { value } }) => setSearchKey(value)}
        />
        {/* Filter option */}
        <Filter onClick={() => setIsFilterOpen(true)} />
        <FilterUI
          initialValues={{ type: typeFromUrl, year: yearFromUrl }}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>
      {isEmpty(movies) ? (
        <NoData title={t("movie.noData")} />
      ) : (
        <>
          <div className="grid grid-cols-2 justify-items-center gap-x-2 gap-y-8 p-4 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map(movie => (
              <div
                className="cursor-pointer"
                key={movie.imdbID}
                onClick={() => handleOpenMovie(movie.imdbID, movie.title)}
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
      <MovieDetails
        imdbID={movieIdFromUrl}
        isOpen={!!movieIdFromUrl}
        onClose={handleCloseMovie}
      />
    </div>
  );
};

export default MovieList;
