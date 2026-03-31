import GameDetails from "@/components/GameDetails";

type GamePageProps = {
  params: {
    id: string;
  }
}
const GamePage = async ({ params }: GamePageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-col mt-12 flex-1 items-center justify-center bg-background px-4">
      <GameDetails id={id} />
    </div>
  )
}

export default GamePage;
