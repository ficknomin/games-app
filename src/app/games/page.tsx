import GamesList from "@/components/GamesList";


const GamesPage = () => {

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold px-2 pb-5 md:ms-10 -mt-5">All Games</h1>
        <GamesList />
      </main>
    </div>
  );
}

export default GamesPage;
