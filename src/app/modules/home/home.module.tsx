"use client";

import { Button } from "@/app/shared/ui/button";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const router = useRouter();

  return (
    <main className="flex flex-1 w-full flex-col gap-2 items-center justify-center bg-background">
      <h1 className="text-3xl font-bold text-center">Games Hub</h1>
      <p className="text-sm text-muted-foreground text-center">
        Explore and like your favorite games
      </p>
      <Button
        variant="outline"
        size="lg"
        className="mt-4 rounded-xs hover:cursor-pointer"
        onClick={() => router.push("/games")}
      >
        Explore games
      </Button>
    </main>
  );
};
