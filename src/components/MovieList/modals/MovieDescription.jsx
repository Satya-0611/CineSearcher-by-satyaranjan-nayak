const MovieDescription = ({
  movieDetails: { Director, Actors, BoxOffice, Year, Runtime, Language, Rated },
}) => (
  <div className="space-y-3 text-sm">
    {[
      { label: "Director:", value: Director },
      { label: "Actors:", value: Actors },
      { label: "Box Office:", BoxOffice },
      { label: "Year:", value: Year },
      { label: "Runtime:", value: Runtime },
      { label: "Language:", value: Language },
      { label: "Rated:", value: Rated },
    ].map(({ label, value }) => (
      <div className="flex gap-2" key={label}>
        <span className="font-bold text-gray-900">{label}</span>
        <span className="text-gray-600">{value}</span>
      </div>
    ))}
  </div>
);

export default MovieDescription;
