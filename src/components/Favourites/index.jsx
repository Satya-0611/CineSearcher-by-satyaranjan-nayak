import { NoData } from "neetoui";
import { isEmpty } from "ramda";
import useFavouritesStore from "stores/useFavouritesStore";

import FavouriteListItem from "./FavouriteListItem";

const Favourites = () => {
  const { favourites } = useFavouritesStore.pick();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto py-8">
      <div className="flex flex-col gap-6">
        {isEmpty(favourites) ? (
          <div className="mt-20 flex justify-center">
            <NoData
              description="Go back to home and add some movies to your list."
              title="No Favourites Added"
            />
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
