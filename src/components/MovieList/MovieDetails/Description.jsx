import { withTranslation } from "react-i18next";

const MovieDescription = ({
  movieDetails: { director, actors, boxOffice, year, runtime, language, rated },
  t,
}) => (
  <div className="space-y-3 text-sm">
    {[
      { label: t("movie.director"), value: director },
      { label: t("movie.actors"), value: actors },
      { label: t("movie.boxOffice"), value: boxOffice },
      { label: t("movie.year"), value: year },
      { label: t("movie.runtime"), value: runtime },
      { label: t("movie.language"), value: language },
      { label: t("movie.rated"), value: rated },
    ].map(({ label, value }) => (
      <div className="flex gap-2" key={label}>
        <span className="font-bold text-gray-900">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    ))}
  </div>
);

export default withTranslation()(MovieDescription);
