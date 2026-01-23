import React, { useEffect, useState } from "react";

import moviesApi from "apis/movies";
import { Modal, Typography, Spinner } from "neetoui";

const MovieDetails = ({ imdbID, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const debounceFnId = setTimeout(() => {
      fetchMovieDetails(imdbID);
    }, 500);

    return () => clearInterval(debounceFnId);
  }, [imdbID]);

  const fetchMovieDetails = async imdbID => {
    setIsLoading(true);
    try {
      const response = await moviesApi.getMovieDetails(imdbID);
      setMovieDetails(response);
    } catch (error) {
      console.log("An error Occurred", error);
      setMovieDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen size="large" onClose={onClose}>
      {isLoading ? (
        <div className="flex h-96 w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="rounded-lg p-6">
          {/* Header Section */}
          <div className="mb-6 pr-8">
            <Typography className="text-gray-800" style="h2" weight="bold">
              {movieDetails?.Title}
            </Typography>
            {/* Genre Tags */}
            <div className="mt-2 flex flex-wrap gap-2">
              {movieDetails?.Genre?.split(", ").map(genre => (
                <span
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                  key={genre}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          {/* Body Section */}
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* Left - Image */}
            <div>
              <img
                alt={movieDetails?.Title}
                className="h-auto w-full max-w-md rounded-lg object-cover shadow-md md:w-64"
                src={
                  movieDetails?.Poster !== "N/A"
                    ? movieDetails?.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
              />
            </div>
            {/* RIGHT - Description */}
            <div className="flex flex-1 flex-col">
              <Typography className="mb-6 text-gray-600">
                {movieDetails?.Plot}
              </Typography>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Director:", value: movieDetails?.Director },
                  { label: "Actors:", value: movieDetails?.Actors },
                  { label: "Box Office:", value: movieDetails?.BoxOffice },
                  { label: "Year:", value: movieDetails?.Year },
                  { label: "Runtime:", value: movieDetails?.Runtime },
                  { label: "Language:", value: movieDetails?.Language },
                  { label: "Rated:", value: movieDetails?.Rated },
                ].map(item => (
                  <div className="flex gap-2" key={item.label}>
                    <span className="font-bold text-gray-900">
                      {item.label}
                    </span>
                    <span className="text-gray-600">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieDetails;
