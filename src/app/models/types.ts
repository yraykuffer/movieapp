import { SafeResourceUrl } from "@angular/platform-browser";

export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  duration: string;
  genre: string;
  releasedDate: string;
  trailerLink: string | SafeResourceUrl;
  listed?: boolean;
  thumpnail: string;
}

export type AppStateModel = {
  movies: Movie[],
  watchList: Movie[],
  selectedMovie: Movie | null,
  sortBy: Sort
}

export type Sort = {
  by: string;
  order: 'desc' | 'asc';
}
