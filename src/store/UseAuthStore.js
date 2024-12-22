import { create } from "zustand";
import { persist } from "zustand/middleware";

export const AuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setLogin: (data) => {
        set({
          token: data.acceess_token,
          user: data.user,
        });
      },
      logout: () => set({ isAuthenticated: false, user: null, fullinfo: null }),
    }),
    {
      isAuthenticated: () => {
        return !!get().token;
      },
    },
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
