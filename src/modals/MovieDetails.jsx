import React from "react";

import { Modal, Typography, Spinner } from "neetoui";

const MovieDetails = ({ imdbID, onClose }) => {
  const isLoading = false;
  console.log(`movie will be fetched using ${imdbID} later`);

  const movieDetails = {
    Title: "Spider-Man: No Way Home",
    Year: "2021",
    Rated: "PG-13",
    Released: "17 Dec 2021",
    Runtime: "148 min",
    Genre: "Action, Adventure, Fantasy",
    Director: "Jon Watts",
    Writer: "Chris McKenna, Erik Sommers, Stan Lee",
    Actors: "Tom Holland, Zendaya, Benedict Cumberbatch",
    Plot: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    Language: "English, Tagalog",
    Country: "United States",
    Awards: "Nominated for 1 Oscar. 35 wins & 72 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.2/10",
      },
      {
        Source: "Rotten Tomatoes",
        Value: "93%",
      },
      {
        Source: "Metacritic",
        Value: "71/100",
      },
    ],
    Metascore: "71",
    imdbRating: "8.2",
    imdbVotes: "994,154",
    imdbID: "tt10872600",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$814,866,759",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
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
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left - Image */}
            <div>
              <img
                alt={movieDetails?.Title}
                className="h-auto w-full rounded-lg object-cover shadow-md md:w-64"
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
