import React from "react";

import AddToFavourites from "components/commons/AddToFavourites";
import { useShowMovieDetails } from "hooks/reactQuery/useMoviesApi";
import { Modal, Typography, Spinner } from "neetoui";

import MovieDescription from "./Description";
import GenreTags from "./GenreTags";

import PosterImage from "../PosterImage";

const MovieDetails = ({ imdbID, onClose, isOpen }) => {
  const { data: movieDetails = {}, isLoading } = useShowMovieDetails(imdbID);

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
              {movieDetails?.title}
              <AddToFavourites {...movieDetails} />
            </Typography>
            <GenreTags genres={movieDetails?.genre} />
          </div>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* Left - Image */}
            <PosterImage
              alt={movieDetails?.title}
              className="h-auto w-full max-w-md rounded-lg object-cover shadow-md md:w-64"
              src={movieDetails?.poster}
            />
            {/* Right - Description */}
            <div className="flex flex-1 flex-col">
              <Typography className="mb-6 text-gray-600">
                {movieDetails?.plot}
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
