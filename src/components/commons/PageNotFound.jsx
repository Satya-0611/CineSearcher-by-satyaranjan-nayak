import { NoData } from "neetoui";
import { withTranslation } from "react-i18next";

const PageNotFound = ({ t }) => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.title"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default withTranslation()(PageNotFound);
