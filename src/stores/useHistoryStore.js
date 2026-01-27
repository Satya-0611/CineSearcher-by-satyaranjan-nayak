import { existsBy } from "neetocist";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
  persist(
    (set, get) => ({
      moviesHistory: [],

      activeMovie: null,

      setActiveMovie: movie => {
        set({
          activeMovie: movie,
        });
      },

      addToMoviesHistory: movie => {
        const { moviesHistory } = get();

        if (!existsBy({ imdbID: movie.imdbID }, moviesHistory)) {
          const newHistory = [movie, ...moviesHistory];

          set({
            moviesHistory: newHistory,
            activeMovie: movie,
          });
        } else {
          set({ activeMovie: movie });
        }
      },
    }),
    {
      name: "cine-searcher-history",
    }
  )
);

export default useHistoryStore;
