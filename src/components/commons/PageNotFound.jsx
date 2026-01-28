import { NoData } from "neetoui";
import { withTranslation } from "react-i18next";
import routes from "routes";

const PageNotFound = ({ t }) => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.label"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: routes.root,
      }}
    />
  </div>
);

export default withTranslation()(PageNotFound);
