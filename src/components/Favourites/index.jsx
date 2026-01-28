import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouritesStore from "stores/useFavouritesStore";

import FavouriteListItem from "./ListItem";

const Favourites = () => {
  const { favourites } = useFavouritesStore.pick();
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto py-8">
      <div className="flex flex-col gap-6">
        {isEmpty(favourites) ? (
          <div className="mt-20 flex justify-center">
            <NoData title={t("favourites.noData")} />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6">
            {favourites.map(movie => (
              <FavouriteListItem key={movie.imdbID} {...movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
