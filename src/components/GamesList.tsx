"use client";

import { useGames } from "@/hooks/useGames";
import { Spinner } from "./ui/spinner";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination";
import GameCard from "./GameCard";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGenres } from "@/hooks/useGenres";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { GenreFilter, PlatformFilter } from "@/lib/types";
import { usePlatforms } from "@/hooks/usePlatforms";

export type GamesListFilters = {
  search: string;
  genre: string;
  platform: string;
  page: number;
}

const GamesList = () => {
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    platform: '',
    page: 1,
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<GamesListFilters>({
    defaultValues: {
      search: '',
      genre: '',
      platform: '',
      page: 1,
    }
  });

  const onSubmit = (filters: GamesListFilters) => {
    setFilters({ ...filters, page: 1 });
    console.log(filters.platform);
  }

  const { isLoading: isGamesLoading, isError: isGamesError, data: gamesData, error: gamesError } = useGames(filters);
  const { isLoading: isGenresLoading, isError: isGenresError, data: genresData, error: genresError } = useGenres();
  const { isLoading: isPlatformsLoading, isError: isPlatformsError, data: platformsData, error: platformsError } = usePlatforms();

  if (isGamesLoading) {
    return (
      <div className="flex justify-center py-28">
        <Spinner className="animate-spin" />
      </div>
    );
  }

  if (isGamesError) {
    return (
      <div className="text-xl text-destructive text-center py-20">
        {`Error loading the games: ${gamesError?.message}`}
      </div>
    );
  }

  return (

    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        <div className="col-span-full p-3 bg-card rounded-sm shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-left gap-4">
            <h1 className="text-lg mx-2 font-bold">Search Games</h1>
            <Input type="text" placeholder="Search games..." {...register("search")} className="w-full rounded-sm" />
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>

                  <SelectContent>
                    {isGenresLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : isGenresError ? (
                      <SelectItem value="error" disabled>
                        Error loading
                      </SelectItem>
                    ) : (
                      genresData?.map((genre: GenreFilter) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="platform"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>

                  <SelectContent>
                    {isPlatformsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : isPlatformsError ? (
                      <SelectItem value="error" disabled>
                        Error loading
                      </SelectItem>
                    ) : (
                      platformsData?.map((platform: PlatformFilter) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            <Button type="submit" className={isSubmitting ? "cursor-not-allowed opacity-50 rounded-sm" : "cursor-pointer rounded-sm"} disabled={isSubmitting}>
              {isSubmitting ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {isGamesLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <Spinner className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          gamesData?.results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        )}

        {gamesData?.results.length === 0 &&
          <div className="col-span-full text-center text-lg text-muted-foreground pt-12 pb-8">
            No games found matching your criteria.
          </div>
        }


      </div>
      <Pagination className="flex justify-center mt-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))} className={filters.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm text-muted-foreground">
              {filters.page}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
              className={!gamesData?.next ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}

export default GamesList;
