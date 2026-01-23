import { Typography } from "neetoui";

const MovieListItem = ({ Poster, Title, Year }) => (
  <div className="neeto-ui-rounded-xl flex w-60 flex-col justify-between border p-4 shadow-md">
    <img
      alt={`${Title} poster`}
      className="mb-4 h-64 w-full rounded-md object-cover"
      src={Poster}
    />
    <Typography className="text-lg text-gray-900" weight="semibold">
      {Title}
    </Typography>
    <Typography className="mt-1 text-gray-500">{`Movie . ${Year}`}</Typography>
    <button
      className="hover:scale-1.1 mt-auto pt-3 text-sm font-bold text-[#4a90e2] hover:underline"
      style={{ color: "#4a90e2" }}
    >
      View details
    </button>
  </div>
);

export default MovieListItem;
