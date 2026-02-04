import { existsBy, removeBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FAVOURITE_KEY } from "./constants";

const useFavouritesStore = create(
  persist(
    (set, get) => ({
      favourites: [],

      addToFavourites: movie => {
        const { favourites } = get();
        if (!existsBy({ imdbID: movie.imdbID }, favourites)) {
          set({ favourites: [movie, ...favourites] });
        }
      },

      removeFromFavourites: imdbID =>
        set(state => ({
          favourites: removeBy({ imdbID }, state.favourites),
        })),

      isFavourite: imdbID => {
        const { favourites } = get();

        return existsBy({ imdbID }, favourites);
      },
    }),
    {
      name: FAVOURITE_KEY,
    }
  )
);

export default useFavouritesStore;
