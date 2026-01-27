import { existsBy, removeBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritesStore = create(
  persist((set, get) => ({
    favourites: [],
    addToFavourites: movie => {
      const { favourites } = get();
      // to check for duplicates
      if (!existsBy({ imdbID: movie.imdbID }, favourites)) {
        set({ favourites: [movie, ...favourites] });
      }
    },
    removeFromFavourites: ({ imdbID }) =>
      set(({ favourites }) => removeBy({ ...imdbID }, favourites)),
    isFavourite: ({ imdbID }) => {
      const { favourites } = get();

      return existsBy({ ...imdbID }, favourites);
    },
  }))
);

export default useFavouritesStore;
