import { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { Link } from "react-router-dom";
import routes from "routes";
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

  const addToMoviesHistory = useHistoryStore(state => state.addToMoviesHistory);

  useEffect(() => {
    const deBounceFn = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(deBounceFn);
  }, [searchKey]);

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
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5] px-4 py-8">
      {/* Search Bar */}
      <Input
        placeholder="Search for movies"
        prefix={<Search />}
        type="search"
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      {isEmpty(movies) ? (
        <NoData
          className="flex w-full flex-1 justify-start"
          description="Search a valid movie name"
          title="No Movies Found"
        />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
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
      <Link
        className="mx-auto w-32 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 shadow hover:bg-gray-400"
        to={routes.history}
      >
        View History
      </Link>
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
