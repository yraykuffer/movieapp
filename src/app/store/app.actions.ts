import { MessageInfo, Movie, Sort } from "../models/types";

export class GetMovies {
  static readonly type = '[Movie List Page] Get Movies';
}

export class GetSelectedMovie {
  static readonly type = '[Movie Details Page] Get Selected Movie';
  constructor(public id: number) {}
}

export class GetWatchList {
  static readonly type = '[Watch List Page] Get WatchList';
}

export class AddMovieToWatchList {
  static readonly type = '[Movie List Page] Add Movie To Watchlist';
  constructor(public movie: Movie) {}
}

export class RemoveMovieToWatchList {
  static readonly type = '[Watch List Page] Remove Movie To Watchlist';
  constructor(public id: number) {}
}

export class SortMovies {
  static readonly type = '[Movie List Page] Sort Movies';
  constructor(public sort: Sort) {}
}

export class SortWatchList {
  static readonly type = '[Watch List Page] Sort Movie WatchList';
  constructor(public sort: Sort) {}
}

export class UpdateMovieStatus {
  static readonly type = '[APP STATE] Update Movie Status';
  constructor(public id: number, public status: 'add' | 'remove') {}
}

export class ShowAlert {
  static readonly type = '[Movie List Page] Show Alert';
  constructor(public alert: MessageInfo) {}
}

export class HideAlert {
  static readonly type = '[APP STATE] Hide Alert';
  constructor(public alert: MessageInfo) {}
}
