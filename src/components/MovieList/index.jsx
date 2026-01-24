import { useEffect, useState, useRef } from "react";

import { Search } from "neetoicons";
import { Input, NoData, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import moviesApi from "src/apis/movies";
import MovieDetails from "src/modals/MovieDetails";
import useHistoryStore from "stores/useHistoryStore";

import MovieListItem from "./MovieListItem";

import PageLoader from "../commons/PageLoader";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const searchInputRef = useRef(null);

  const addToMoviesHistory = useHistoryStore(state => state.addToMoviesHistory);

  useEffect(() => {
    const deBounceFn = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(deBounceFn);
  }, [searchKey]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        // to not let '/' typed into search bar
        event.preventDefault();

        // Focus the input
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchMovies = async () => {
    if (!searchKey.trim()) {
      setMovies([]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    try {
      const response = await moviesApi.searchMovies(searchKey);

      setMovies(response?.Search || []);
    } catch (error) {
      console.log("An error Occurred", error);
      Toastr.error(error.message, { autoClose: 2000 });
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
