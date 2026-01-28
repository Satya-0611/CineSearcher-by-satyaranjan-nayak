import { useState } from "react";

import dayjs from "dayjs";
import { Typography, Input, Checkbox, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const FilterUI = ({ initialValues, onSubmit, onClose }) => {
  const [year, setYear] = useState(initialValues?.year || "");
  const [yearError, setYearError] = useState("");
  const [type, setType] = useState(() => {
    const typeString = initialValues?.type || "movie, series";

    return typeString ? typeString.split(", ") : [];
  });
  const { t } = useTranslation();

  const handleTypeChange = ({ target: { name, checked } }) => {
    if (checked) {
      setType([...type, name]);
    } else {
      setType(type?.filter(type => type !== name));
    }
  };

  const handleSubmit = () => {
    if (parseInt(year) > dayjs().year()) {
      setYearError(t("errorMessages.year"));

      return;
    }
    let typeParam = type.join(",");

    // if both type selected
    if (isEmpty(type) !== 1) {
      typeParam = "";
    }

    onSubmit({ year, type: typeParam });
    onClose();
  };

  return (
    <div className="absolute right-96 top-12 z-10 w-80 rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Typography style="h4" weight="bold">
          {t("filter.title")}
        </Typography>
        <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
          &#10006;
        </button>
      </div>
      {/* Year Input */}
      <div className="mb-4">
        <Input
          error={yearError}
          label={t("filter.year")}
          placeholder="2024"
          value={year}
          onChange={e => {
            if (/^\d*$/.test(e.target.value)) setYear(e.target.value);
          }}
        />
      </div>
      <div className="mb-6">
        <Typography className="mb-2" style="body2" weight="semibold">
          {t("filter.type")}
        </Typography>
        <div className="flex gap-6">
          <Checkbox
            checked={type.includes("movie")}
            id="movie"
            label={t("filter.movie")}
            name="movie"
            onChange={handleTypeChange}
          />
          <Checkbox
            checked={type.includes("series")}
            id="series"
            label={t("filter.series")}
            name="series"
            onChange={handleTypeChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button label="Apply Filters" size="small" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default FilterUI;
