import { getFromLocalStorage, setToLocalStorage } from "utils/storage";
import { create } from "zustand";

import { HISTORY_KEY } from "./constants";

const useHistoryStore = create((set, get) => ({
  moviesHistory: getFromLocalStorage(HISTORY_KEY) || [],

  activeMovie: null,

  addToMoviesHistory: movie => {
    const { moviesHistory } = get();

    if (!moviesHistory.includes(movie)) {
      const newHistory = [movie, ...moviesHistory];

      set({
        moviesHistory: newHistory,
        activeMovie: movie,
      });

      setToLocalStorage(HISTORY_KEY, newHistory);
    } else {
      set({ activeMovie: movie });
    }
  },
}));

export default useHistoryStore;
