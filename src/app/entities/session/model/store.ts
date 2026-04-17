import { create } from "zustand";
import { SessionState, SessionActions } from "./types";

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
  accessToken: null,
  user: null,
  isInitialised: false,

  setSession: (token, user) => set({ accessToken: token, user }),

  clearSession: () => set({ accessToken: null, user: null }),

  setInitialised: () => set({ isInitialised: true }),
}));
