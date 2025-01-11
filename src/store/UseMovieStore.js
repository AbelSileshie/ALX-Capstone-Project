import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand Store for managing movies
export const useMovieStore = create(
  persist(
    (set, get) => ({
      movies: [],

      // Add a movie if it doesn't already exist
      addMovie: (movie) =>
        set((state) => {
          const movieExists = state.movies.some((m) => m.id === movie.id);
          if (movieExists) {
            return { movies: state.movies };
          } else {
            const updatedMovies = [...state.movies, movie];
            return { movies: updatedMovies };
          }
        }),

      // Remove a movie by its ID
      removeMovie: (movieId) =>
        set((state) => {
          const updatedMovies = state.movies.filter((m) => m.id !== movieId);
          return { movies: updatedMovies };
        }),

      // Check if a movie is saved
      isMovieSaved: (movieId) => {
        return get().movies.some((m) => m.id === movieId);
      },
    }),
    {
      name: "movie-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
