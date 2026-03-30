"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center bg-background">
      <h1 className="text-3xl font-bold text-center">Welcome to Games Hub</h1>
      <Button variant="outline" className="mt-2" onClick={() => router.push("/games")}>Explore games</Button>
    </main>
  )
}

export default HomePage;
