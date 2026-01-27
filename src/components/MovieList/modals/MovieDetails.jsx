import React, { useEffect } from "react";

import AddToFavourites from "components/commons/AddToFavourites";
import { useShowMovieDetails } from "hooks/reactQuery/useMoviesApi";
import { Modal, Typography, Spinner, Toastr } from "neetoui";

import GenreTags from "./GenreTags";
import MovieDescription from "./MovieDescription";

import PosterImage from "../PosterImage";

const MovieDetails = ({ imdbID, onClose, isOpen }) => {
  const {
    data: movieDetails = {},
    isLoading,
    isError,
    error,
  } = useShowMovieDetails(imdbID);

  useEffect(() => {
    if (isError && error) {
      Toastr.error(error.message);
    }
  }, [isError, error]);

  return (
    <Modal isOpen={isOpen} size="large" onClose={onClose}>
      {isLoading ? (
        <div className="flex h-96 w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="rounded-lg p-6">
          {/* Header Section */}
          <div className="mb-6 pr-8">
            <Typography
              className="flex gap-3 font-bold text-gray-800"
              style="h3"
            >
              {movieDetails?.Title}
              <AddToFavourites {...movieDetails} />
            </Typography>
            <GenreTags genres={movieDetails?.Genre} />
          </div>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* Left - Image */}
            <PosterImage
              alt={movieDetails?.Title}
              className="h-auto w-full max-w-md rounded-lg object-cover shadow-md md:w-64"
              src={movieDetails?.Poster}
            />
            {/* Right - Description */}
            <div className="flex flex-1 flex-col">
              <Typography className="mb-6 text-gray-600">
                {movieDetails?.Plot}
              </Typography>
              <MovieDescription movieDetails={movieDetails} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MovieDetails;
