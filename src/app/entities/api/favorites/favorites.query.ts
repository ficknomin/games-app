import { useEffect } from "react";
import { useAuth } from "@/app/shared/hooks/use-auth.hook";
import { useFavoritesStore } from "@/app/shared/hooks/use-favorites-store.hook";
import { syncFavoritesOnLogin } from "@/app/entities/api/favorites/favorites.api";
import { createClient } from "@/config/env/env.client";

export const useSyncFavorites = () => {
  const { user } = useAuth();
  const setFavorites = useFavoritesStore((s) => s.setFavorites);
  const favoritesMap = useFavoritesStore((s) => s.favorites);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;

    const sync = async () => {
      const localFavorites = Object.values(favoritesMap);
      const mergedIds = await syncFavoritesOnLogin(localFavorites);

      if (mergedIds.length === 0) {
        setFavorites([]);
        return;
      }

      const { data: games, error } = await supabase
        .from("games")
        .select("*")
        .in("id", mergedIds);

      if (error) throw error;

      setFavorites(games || []);
    };

    sync();
  }, [user]);
};
