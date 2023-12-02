import { Movie, Sort } from "../models/types";

export class GetMovies {
  static readonly type = '[Movie List Page] Get Movies';
}

export class GetSelectedMovie {
  static readonly type = '[Movie List Page] Get Selected Movie';
  constructor(public id: number) {}
}

export class GetWatchList {
  static readonly type = '[Movie List Page] Get WatchList';
}

export class AddMovieToWatchList {
  static readonly type = '[Movie List Page] Add Movie To Watchlist';
  constructor(public movie: Movie) {}
}

export class RemoveMovieToWatchList {
  static readonly type = '[Movie List Page] Remove Movie To Watchlist';
  constructor(public id: number) {}
}

export class SortMovies {
  static readonly type = '[Movie List Page] Sort Movies';
  constructor(public sort: Sort) {}
}

export class SortWatchList {
  static readonly type = '[Movie List Page] Sort Movie WatchList';
  constructor(public sort: Sort) {}
}

export class UpdateMovieStatus {
  static readonly type = '[Movie List Page] Update Movie Status';
  constructor(public id: number, public status: 'add' | 'remove') {}
}
