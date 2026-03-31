export type Genre = {
  id: string;
  name: string;
}

export type Platform = {
  id: string;
  name: string;
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
  ratings: { id: string; title: string; percent: string }[];
  tags: { name: string }[];
}

export type GamesResponse = {
  results: Game[];
  count: number;
  next: string | null;
  previous: string | null;
}
