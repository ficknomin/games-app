import { fetchGame } from "@/app/entities/api/games";
import { GameDetails } from "@/app/widgets/game-details";
import { Metadata } from "next";

type GamePageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = await fetchGame(id);

  if (!game) {
    return { title: "Game not found" };
  }

  return {
    title: game.name,
    description: `Games Hub. Game description for game: ${game.name}`,
    openGraph: {
      title: game.name,
      images: game.background_image ? [game.background_image] : [],
    },
  };
}

const GamePage = async ({ params }: GamePageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-col mt-12 flex-1 items-center justify-center bg-background px-4">
      <GameDetails id={id} />
    </div>
  );
};

export default GamePage;
