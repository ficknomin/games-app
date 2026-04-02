import { FavoriteGame } from "@/lib/types"

export type FavoritesStore = {
  favorites: Record<number, FavoriteGame>;

  setFavorites: (games: FavoriteGame[]) => void;

  addFavorite: (game: FavoriteGame) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

