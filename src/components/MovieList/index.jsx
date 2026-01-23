import { useState, useEffect } from "react";

import axios from "axios";
import { Search } from "neetoicons";
import { Input } from "neetoui";

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  const fetchMovies = async () => {
    try {
      const url = `${baseUrl}/?s=${searchKey}&apiKey=${apiKey}`;
      const response = await axios.get(url);
      const result = response?.data?.Search || [];
      setMovies(result);
      console.log(result);
      console.log(movies);
    } catch (error) {
      console.log("An error Occured", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    const debounceTimerId = setTimeout(() => {
      fetchMovies();

      return () => clearInterval(debounceTimerId);
    }, 500);
  }, [searchKey]);

  return (
    <div className="flex h-screen flex-col">
      <Input
        className="mx-8 my-4"
        placeholder="Search for movies"
        prefix={<Search />}
        type="search"
        value={searchKey}
        onChange={e => {
          setSearchKey(e.target.value);
        }}
      />
    </div>
  );
};

export default ShowMovies;
