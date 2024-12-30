import { create } from "zustand";

export const useBackgroundStore = create((set) => ({
  background: "",
  setBackground: (newBackground) => set({ background: newBackground }),
}));
