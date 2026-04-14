import { FavoriteGame } from "@/app/entities/models";
import { useFavoritesStore } from "@/app/shared/hooks";
import { addFavoriteDB, removeFavoriteDB } from "@/app/entities/api/favorites";

export const useToggleFavorites = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const toggleFavorite = async (game: FavoriteGame) => {
    const favorite = isFavorite(game.id);

    if (favorite) {
      removeFavorite(game.id);
      try {
        await removeFavoriteDB(game.id);
      } catch {
        addFavorite(game);
      }
    } else {
      addFavorite(game);
      try {
        await addFavoriteDB(game.id);
      } catch {
        removeFavorite(game.id);
      }
    }
  };

  return { toggleFavorite, isFavorite };
};
