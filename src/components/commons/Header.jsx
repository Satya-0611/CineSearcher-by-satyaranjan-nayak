import { Typography } from "neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import routes from "routes";

const Header = () => (
  <div className="sticky top-0 z-50 flex w-full gap-6 border-b bg-white px-6 py-4 shadow-sm">
    <div className="flex text-2xl font-bold">
      <Typography className="text-blue-600" style="h3" weight="bold">
        Cine&nbsp;
      </Typography>
      <Typography className="text-black" style="h3" weight="bold">
        Searcher
      </Typography>
    </div>
    <NavLink
      activeClassName="text-blue-500"
      className="m-1 font-bold"
      to={routes.root}
    >
      Home
    </NavLink>
    <NavLink
      activeClassName="text-blue-500"
      className="m-1 font-bold"
      to={routes.favourites}
    >
      favourites
    </NavLink>
  </div>
);

export default Header;
