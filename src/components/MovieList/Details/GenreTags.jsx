import { Tag } from "neetoui";
import { isEmpty } from "ramda";

const GenreTags = ({ genres }) => {
  if (isEmpty(genres) || !genres) return null;
  const genreList = Array.isArray(genres) ? genres : genres.split(", ");

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {genreList.map(genre => (
        <Tag
          className="font-semibold text-gray-700"
          key={genre}
          label={genre}
          size="small"
          style="secondary"
          type="solid"
        />
      ))}
    </div>
  );
};

export default GenreTags;
