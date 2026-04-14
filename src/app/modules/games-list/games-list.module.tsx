"use client";

import { useGames } from "@/app/entities/api/games";
import { Spinner } from "@/app/shared/ui/spinner";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/app/shared/ui/pagination";
import { GameCard } from "@/app/widgets/game-card";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import { useGenres } from "@/app/entities/api/genres";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/ui/select";
import { GenreFilter, PlatformFilter } from "@/app/entities/models";
import { usePlatforms } from "@/app/entities/api/platforms";
import { LoadingState } from "@/app/shared/ui/loading-state";
import { ErrorState } from "@/app/shared/ui/error-state";

export enum FilterTypes {
  RATINGASC = "RATINGASC",
  RATINGDESC = "RATINGDESC",
  YEARASC = "YEARASC",
  YEARDESC = "YEARDESC",
}

export type GamesListFilters = {
  search: string;
  genre: string;
  platform: string;
  filter: FilterTypes | "";
  page: number;
};

export const GamesList = () => {
  const [filters, setFilters] = useState<GamesListFilters>({
    search: "",
    genre: "",
    platform: "",
    filter: "",
    page: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<GamesListFilters>({
    defaultValues: {
      search: "",
      genre: "",
      platform: "",
      filter: "",
      page: 1,
    },
  });

  const onSubmit = (filters: GamesListFilters) => {
    setFilters({ ...filters, page: 1 });
    console.log(filters.platform);
  };

  const {
    isLoading: isGamesLoading,
    isError: isGamesError,
    data: gamesData,
    error: gamesError,
    refetch: refetchGames,
  } = useGames(filters);
  const {
    isLoading: isGenresLoading,
    isError: isGenresError,
    data: genresData,
    error: genresError,
    refetch: refetchGenres,
  } = useGenres();
  const {
    isLoading: isPlatformsLoading,
    isError: isPlatformsError,
    data: platformsData,
    error: platformsError,
    refetch: refetchPlatforms,
  } = usePlatforms();

  if (isGamesLoading) {
    return <LoadingState />;
  }

  if (isGamesError) {
    return <ErrorState message={gamesError?.message} onRetry={refetchGames} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-full p-3 bg-card rounded-sm shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-left gap-4"
          >
            <h1 className="text-lg mx-2 font-bold">Search Games</h1>
            <Input
              type="text"
              placeholder="Search games..."
              {...register("search")}
              className="w-full rounded-sm"
            />
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
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
                        <SelectItem key={genre.value} value={genre.label}>
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
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
                        <SelectItem key={platform.value} value={platform.label}>
                          {platform.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="filter"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue placeholder="Select order filter" />
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
                      <SelectGroup>
                        <SelectItem
                          key={FilterTypes.RATINGASC}
                          value={FilterTypes.RATINGASC}
                        >
                          Rating Ascending
                        </SelectItem>
                        <SelectItem
                          key={FilterTypes.RATINGDESC}
                          value={FilterTypes.RATINGDESC}
                        >
                          Rating Descending
                        </SelectItem>
                        <SelectItem
                          key={FilterTypes.YEARASC}
                          value={FilterTypes.YEARASC}
                        >
                          Release Date Ascending
                        </SelectItem>
                        <SelectItem
                          key={FilterTypes.YEARDESC}
                          value={FilterTypes.YEARDESC}
                        >
                          Release Date Descending
                        </SelectItem>
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
              )}
            />

            <Button
              type="submit"
              className={
                isSubmitting
                  ? "cursor-not-allowed opacity-50 rounded-sm"
                  : "cursor-pointer rounded-sm"
              }
              disabled={isSubmitting}
            >
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

        {gamesData?.results.length === 0 && (
          <div className="col-span-full text-center text-lg text-muted-foreground pt-12 pb-8">
            No games found matching your criteria.
          </div>
        )}
      </div>
      <Pagination className="flex justify-center mt-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                gamesData?.previous &&
                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              className={
                !gamesData?.previous
                  ? "pointer-events-none opacity-50 rounded-sm"
                  : "cursor-pointer rounded-sm"
              }
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm text-muted-foreground">
              {filters.page}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                gamesData?.next &&
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className={
                !gamesData?.next
                  ? "pointer-events-none opacity-50 rounded-sm"
                  : "cursor-pointer rounded-sm"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
