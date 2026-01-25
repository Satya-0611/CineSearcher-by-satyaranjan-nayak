import { useEffect, useState, useRef } from "react";

import { useShowMovies } from "hooks/reactQuery/useMoviesApi";
import { Search } from "neetoicons";
import { Input, NoData, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import MovieDetails from "src/modals/MovieDetails";
import useHistoryStore from "stores/useHistoryStore";

import MovieListItem from "./MovieListItem";

import PageLoader from "../commons/PageLoader";

const MovieList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [debouncedSearchKey, setDebouncedSearchKey] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const searchInputRef = useRef(null);

  const addToMoviesHistory = useHistoryStore(state => state.addToMoviesHistory);

  // --- 1. Debounce Logic ---
  // We sync searchKey to debouncedSearchKey after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey]);

  // --- 2. React Query Implementation ---
  const { data, isLoading, isError, error } = useShowMovies(
    debouncedSearchKey,
    {
      // Only run query if debouncedKey is not empty
      enabled: !!debouncedSearchKey.trim(),
      // Keep previous results on screen while new data loads (optional, adds polish)
      placeholderData: previousData => previousData,
    }
  );

  // Derive the movies list from the data
  // The API returns { Search: [...] }, so we access data.Search
  const movies = data?.Search || [];

  // --- 3. Error Handling Side Effect ---
  useEffect(() => {
    if (isError && error) {
      console.log("An error Occurred", error);
      Toastr.error(error.message, { autoClose: 2000 });
    }
  }, [isError, error]);

  // --- 4. UI Logic (Focus) ---
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- Render ---

  // If we are strictly loading and have no data yet, show page loader
  if (isLoading && !movies.length && !!debouncedSearchKey) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-full flex-col justify-start gap-6 px-0">
      {/* Search Bar */}
      <div className="w-full">
        <Input
          className="w-full"
          placeholder="Search for movies"
          prefix={<Search />}
          ref={searchInputRef}
          type="search"
          value={searchKey}
          onChange={e => setSearchKey(e.target.value)}
        />
      </div>
      {isEmpty(movies) ? (
        <NoData
          className="flex w-full flex-1 justify-start"
          description="Search a valid movie name"
          title="No Movies Found"
        />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-x-2 gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map(movie => (
            <div
              key={movie.imdbID}
              onClick={() => {
                setSelectedMovieId(movie.imdbID);
                addToMoviesHistory(movie.Title);
              }}
            >
              <MovieListItem {...movie} />
            </div>
          ))}
        </div>
      )}
      {selectedMovieId && (
        <MovieDetails
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
