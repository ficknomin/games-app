import { FavoritesStore } from "@/app/shared/store/favorites.store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: {},

      setFavorites: (games) =>
        set({
          favorites: Object.fromEntries(games.map((g) => [g.id, g])),
        }),

      addFavorite: (game) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [game.id]: game,
          },
        })),

      removeFavorite: (id) =>
        set((state) => {
          const updated = { ...state.favorites };
          delete updated[id];
          return { favorites: updated };
        }),

      isFavorite: (id) => {
        return !!get().favorites[id];
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
