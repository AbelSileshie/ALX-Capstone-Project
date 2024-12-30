import { create } from "zustand";

export const UseDiscover = create((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));
