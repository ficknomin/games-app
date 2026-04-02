import { useEffect } from "react";
import { useAuth } from "./useAuth"
import { useFavoritesStore } from "./useFavoritesStore";
import { fetchFavoritesDB } from "@/api/favorites";
import { supabase } from "@/db/client";

export const useSyncFavorites = () => {
  const { user } = useAuth();
  const setFavorites = useFavoritesStore((s) => s.setFavorites);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      const data = await fetchFavoritesDB();

      const gameIds = data.map((g) => g.game_id);

      if (gameIds.length === 0) {
        setFavorites([]);
        return;
      }

      const { data: games } = await supabase
        .from("games")
        .select("*")
        .in("id", gameIds);

      setFavorites(games || []);
    };

    loadFavorites();
  }, [user, setFavorites]);
};
