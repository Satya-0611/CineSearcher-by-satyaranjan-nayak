import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

import FavouriteListItem from "./ListItem";

const Favourites = () => {
  const { favourites } = useFavouritesStore.pick();
  const { t } = useTranslation();

  if (isEmpty(favourites)) {
    return (
      <div className="mt-28 flex justify-center">
        <NoData title={t("favourites.noData")} />
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col gap-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6">
        {favourites.map(movie => (
          <FavouriteListItem key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
