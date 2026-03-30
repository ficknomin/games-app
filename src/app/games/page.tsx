import GamesList from "@/components/GamesList";


const GamesPage = () => {

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <GamesList />
      </main>
    </div>
  );
}

export default GamesPage;
