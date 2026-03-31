"use client";

import { Game } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


const GameCard = ({ game }: { game: Game }) => {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/games/${game.id}`)} className="group p-0 rounded-sm overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative w-full aspect-video flex">
        <Image src={game.background_image} alt={game.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>

      <CardHeader className="p-3">
        <CardTitle className="text-sm text-left line-clamp-2">{game.name}</CardTitle>
        <CardDescription className="text-xs text-left text-muted-foreground">{game.released.split("-")[0]}</CardDescription>
      </CardHeader>

      <CardContent className="px-3 pb-3 flex justify-end">
        <Button variant={"ghost"} className="opacity-100 group-hover:opacity-100 hover:!bg-transparent md:opacity-0 transition-opacity duration-300 cursor-pointer" size="icon">
          <ArrowRight className="w-4 h-4" />
        </Button>

      </CardContent>
    </Card>
  )
}

export default GameCard;
