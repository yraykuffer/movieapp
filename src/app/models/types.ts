import { SafeResourceUrl } from "@angular/platform-browser";

export enum SORT_BY {
  TITLE = 'title',
  RELEASED_DATE = 'releasedDate'
}

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
  sortBy: Sort,
  showMessage: MessageInfo | null
}

export type MessageInfo = {
  type: 'error' | 'info',
  message: string;
  visible?: boolean;
}

export type Sort = {
  by: string;
  order: 'desc' | 'asc';
}
