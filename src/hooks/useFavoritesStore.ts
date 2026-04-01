import { FavoritesStore } from "@/stores/favoritesStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create<FavoritesStore>()(
  persist((set, get) => ({
    favorites: {},

    addFavorite: (game) =>
      set((state) => ({
        favorites: {
          ...state.favorites,
          [game.id]: game,
        }
      })),
    removeFavorite: (id) =>
      set((state) => {
        const updated = { ...state.favorites };
        delete updated[id];
        return { favorites: updated }
      }),
    toggleFavorite: (game) => {
      const exists = get().favorites[game.id];

      if (exists) {
        get().removeFavorite(game.id);
      } else {
        get().addFavorite(game);
      }
    },
    isFavorite: (id) => {
      return !!get().favorites[id];
    },
  }),
    {
      name: "favorites-storage",
    }
  )
);
