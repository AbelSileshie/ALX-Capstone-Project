import { create } from "zustand";
import { persist } from "zustand/middleware";

export const AuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: null,
      user: null,
      token: null,
      setLogin: (data) => {
        set({
          token: data.acceess_token,
          user: data.user,
          isAuthenticated: true,
        });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      isAuthenticated: () => {
        return !!get().acceess_token;
      },
    },
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
