import { isEmpty } from "ramda";

const GenreTags = ({ genres }) => {
  if (isEmpty(genres) || !genres) return null;
  const genreList = Array.isArray(genres) ? genres : genres.split(", ");

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {genreList.map(genre => (
        <span
          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
          key={genre}
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

export default GenreTags;
