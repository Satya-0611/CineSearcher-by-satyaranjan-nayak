import useQueryParams from "hooks/useQueryParams";
import { Form as NeetoUIForm } from "neetoui/formik";

import { FILTER_VALIDATION_SCHEMA } from "./constants";
import Form from "./Form";

import { DEFAULT_PAGE_INDEX } from "../constants";

const Filter = ({ initialValues, isOpen, onClose }) => {
  const { updateQueryParams } = useQueryParams();
  const handleApplyFilters = newFilters => {
    let typeString = "";
    if (!newFilters.movie && newFilters.series) {
      typeString = "series";
    }

    if (newFilters.movie && !newFilters.series) {
      typeString = "movie";
    }

    const newFiltersToApply = {
      year: newFilters.year,
      type: typeString,
    };
    updateQueryParams({ ...newFiltersToApply, page: DEFAULT_PAGE_INDEX });
  };

  const INITIAL_SCHEMA = {
    year: initialValues?.year,
    movie: !initialValues?.type?.includes("series"),
    series: !initialValues?.type?.includes("movie"),
  };

  if (!isOpen) return null;

  return (
    <NeetoUIForm
      formikProps={{
        initialValues: INITIAL_SCHEMA,
        validationSchema: FILTER_VALIDATION_SCHEMA,
        onSubmit: handleApplyFilters,
      }}
    >
      <Form onClose={onClose} />
    </NeetoUIForm>
  );
};

export default Filter;
