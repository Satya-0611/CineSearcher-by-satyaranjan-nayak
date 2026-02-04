import withT from "utils/withT";

const MovieDescription = ({
  movieDetails: { director, actors, boxOffice, year, runtime, language, rated },
  t,
}) => {
  const movieDetails = {
    director,
    actors,
    boxOffice,
    year,
    runtime,
    language,
    rated,
  };

  return (
    <div className="space-y-3 text-sm">
      {Object.entries(movieDetails).map(([label, value]) => (
        <div className="flex gap-2" key={label}>
          <span className="font-bold text-gray-900">{t(`movie.${label}`)}</span>
          <span className="text-gray-600">{value}</span>
        </div>
      ))}
    </div>
  );
};
export default withT(MovieDescription);
