import { withTranslation } from "react-i18next";

const MovieDescription = ({
  movieDetails: { Director, Actors, BoxOffice, Year, Runtime, Language, Rated },
  t,
}) => (
  <div className="space-y-3 text-sm">
    {[
      { label: t("movie.director"), value: Director },
      { label: t("movie.actors"), value: Actors },
      { label: t("movie.boxOffice"), value: BoxOffice },
      { label: t("movie.year"), value: Year },
      { label: t("movie.runtime"), value: Runtime },
      { label: t("movie.language"), value: Language },
      { label: t("movie.rated"), value: Rated },
    ].map(({ label, value }) => (
      <div className="flex gap-2" key={label}>
        <span className="font-bold text-gray-900">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    ))}
  </div>
);

export default withTranslation()(MovieDescription);
