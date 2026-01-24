import { create } from "zustand";

const useHistoryStore = create(set => ({
  moviesHistory: [],
  addToMoviesHistory: movie => {
    set(state => ({ moviesHistory: [movie, ...state.moviesHistory] }));
  },
}));

export default useHistoryStore;
