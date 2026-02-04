import { useEffect } from "react";

import { useFormikContext } from "formik";
import useFuncDebounce from "hooks/useFuncDebounce";
import { Close } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";
import withT from "utils/withT";

const Form = ({ onClose, t }) => {
  const { values, submitForm, dirty } = useFormikContext();

  const debouncedSubmit = useFuncDebounce(submitForm);

  useEffect(() => {
    if (dirty) {
      debouncedSubmit();
    }
    // eslint-disable-next-line
  }, [values]);

  return (
    <div className="absolute right-1/3 top-16 z-50 w-1/4 rounded-lg bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <Typography style="h4" weight="bold">
          {t("filter.title")}
        </Typography>
        <Button icon={Close} style="text" onClick={onClose} />
      </div>
      <Input
        className="mb-4"
        label={t("filter.year")}
        name="year"
        placeholder="2024"
        type="number"
      />
      <div className="mb-2">
        <Typography className="mb-2" style="body2" weight="semibold">
          {t("filter.type")}
        </Typography>
        <div className="flex gap-6">
          <Checkbox label={t("filter.movie")} name="movie" />
          <Checkbox label={t("filter.series")} name="series" />
        </div>
      </div>
    </div>
  );
};

export default withT(Form);
