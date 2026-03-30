export type Game = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
}

export type GamesResponse = {
  results: Game[];
  count: number;
  next: string | null;
  previous: string | null;
}
