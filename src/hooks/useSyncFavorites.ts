import { useEffect } from "react";
import { useAuth } from "./useAuth"
import { useFavoritesStore } from "./useFavoritesStore";
import { syncFavoritesOnLogin } from "@/api/favorites";
import { supabase } from "@/db/client";

export const useSyncFavorites = () => {
  const { user } = useAuth();
  const setFavorites = useFavoritesStore((s) => s.setFavorites);
  const favoritesMap = useFavoritesStore((s) => s.favorites);

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
