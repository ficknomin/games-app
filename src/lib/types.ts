export type Genre = {
  id: string;
  name: string;
}

export type GenreFilter = {
  id: string;
  label: string;
  value: string;
}

export type Platform = {
  id: string;
  name: string;
}

export type PlatformFilter = {
  label: string;
  value: string;
}

export type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: string;
  genres: Genre[];
  parent_platforms: { platform: Platform }[];

}

export type GamesResponse = {
  results: Game[];
  count: number;
  next: string | null;
  previous: string | null;
}
