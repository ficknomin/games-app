"use client";

import { useGames } from "@/hooks/useGames";
import { Spinner } from "./ui/spinner";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination";
import Link from "next/link";

const GamesList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error, isFetching } = useGames(page);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-xl text-destructive text-center py-20">
        {`Error loading the games: ${error?.message}`}
      </div>
    );
  }

  return (

    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {isFetching ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <Spinner className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          data?.results.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`} className="block p-2">
              <p>{game.name}</p>
            </Link>
          ))
        )}

        <Pagination className="flex justify-center mt-16">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 text-sm text-muted-foreground">
                {page}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => prev + 1)}
                className={!data?.next ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>

    </div>
  )
}

export default GamesList;
