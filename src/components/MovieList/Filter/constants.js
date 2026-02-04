import dayjs from "dayjs";
import { t } from "i18next";
import * as yup from "yup";

export const FILTER_VALIDATION_SCHEMA = yup.object().shape({
  year: yup
    .number()
    .min(1888, t("errorMessages.yearMinLimit"))
    .max(dayjs().year(), t("errorMessages.yearMaxLimit"))
    .typeError(t("errorMessages.mustBeNumber"))
    .nullable(),
});
