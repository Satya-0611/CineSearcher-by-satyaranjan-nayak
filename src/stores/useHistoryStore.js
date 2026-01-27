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

        if (!moviesHistory.includes(movie)) {
          const newHistory = [movie, ...moviesHistory];

          set({
            moviesHistory: newHistory,
            activeMovie: movie,
          });
        } else {
          set({ activeMovie: movie });
        }
      },

      removeFromMoviesHistory: movie =>
        set(state => ({
          moviesHistory: state.moviesHistory.filter(
            currMovie => currMovie !== movie
          ),
        })),

      clearAllHistory: () =>
        set({
          moviesHistory: [],
        }),
    }),
    {
      name: "cine-searcher-history",
    }
  )
);

export default useHistoryStore;
