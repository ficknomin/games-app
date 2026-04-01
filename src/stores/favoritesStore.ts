import { FavoriteGame } from "@/lib/types"

export type FavoritesStore = {
  favorites: Record<number, FavoriteGame>;

  addFavorite: (game: FavoriteGame) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (game: FavoriteGame) => void;
  isFavorite: (id: number) => boolean;
}

