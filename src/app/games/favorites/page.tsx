import FavoritesList from "@/components/FavoritesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your favorite games stored securely in the database",
};

const FavoritesPage = () => {
  return <FavoritesList />;
};

export default FavoritesPage;
