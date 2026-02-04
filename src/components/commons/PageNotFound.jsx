import { NoData } from "neetoui";
import routes from "routes";
import withT from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.label"),
        to: routes.root,
      }}
    />
  </div>
);

export default withT(PageNotFound);
