import { useEffect, useState } from "react";

import axios from "axios";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import MovieListItem from "./MovieListItem";

import PageLoader from "../commons/PageLoader";

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

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
      const url = `${baseUrl}/?s=${searchKey}&apiKey=${apiKey}`;
      const response = await axios.get(url);

      setMovies(response?.data?.Search || []);
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
        className="mb-8 w-full"
        placeholder="Search for movies"
        prefix={<Search />}
        type="search"
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
      />
      {isEmpty(movies) ? (
        <NoData
          className="flex h-full w-full flex-1 items-center justify-center"
          description="Search a valid movie name"
          title="No Movies Found"
        />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map(movie => (
            <MovieListItem key={movie.imdbID} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowMovies;
