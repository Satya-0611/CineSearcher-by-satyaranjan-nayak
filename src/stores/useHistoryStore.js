import { create } from "zustand";

const useHistoryStore = create((set, get) => ({
  moviesHistory: [],
  activeMovie: null,
  addToMoviesHistory: movie => {
    const { moviesHistory } = get();
    // to prevent duplicate movies
    if (!moviesHistory.includes(movie)) {
      set(state => ({
        moviesHistory: [movie, ...state.moviesHistory],
        activeMovie: movie,
      }));
    } else {
      set({ activeMovie: movie });
    }
  },
  setActiveMovie: movie => set({ activeMovie: movie }),
}));

export default useHistoryStore;
