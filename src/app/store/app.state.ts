import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppStateModel, Movie, Sort } from '../models/types';
import { Injectable } from '@angular/core';
import { MOVIES } from './dummy';
import { AddMovieToWatchList, GetMovies, GetSelectedMovie, GetWatchList, RemoveMovieToWatchList, SortMovies, SortWatchList, UpdateMovieStatus } from './app.actions';
import { MovieService } from '../services/movie.service';

@State<AppStateModel>({
  name: 'zoo',
  defaults: {
    movies: MOVIES,
    selectedMovie: null,
    watchList: [],
    sortBy: {
      by: 'title',
      order: 'asc',
    },
  },
})
@Injectable()
export class AppState {
  constructor( private movieService: MovieService) {}

  // Reducers
  @Action(GetMovies)
  getMovies(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({...state})
  }

  @Action(SortMovies)
  sortMovies(ctx: StateContext<AppStateModel>, {sort}: SortMovies) {
    const state = ctx.getState();
    const sortedMovies = this.movieService.sortMovies(state.movies, sort);
    ctx.setState({...state, movies: sortedMovies})
  }

  @Action(SortWatchList)
  sortWatchList(ctx: StateContext<AppStateModel>, {sort}: SortWatchList) {
    const state = ctx.getState();
    const sortedMovies = this.movieService.sortMovies(state.watchList, sort);
    ctx.setState({...state, watchList: sortedMovies})
  }

  @Action(GetSelectedMovie)
  getSelectedMovie(ctx: StateContext<AppStateModel>, {id}: GetSelectedMovie) {
    const state = ctx.getState();
    const movie = state.movies.find(movie => movie.id === id) || null;
    ctx.setState({...state, selectedMovie: movie})
  }

  @Action(AddMovieToWatchList)
  addWatchList(ctx: StateContext<AppStateModel>, {movie}: AddMovieToWatchList) {
    const state = ctx.getState();
    ctx.setState({...state, watchList: [movie, ...state.watchList]})
    ctx.dispatch(new UpdateMovieStatus(movie.id, 'add'));
  }

  @Action(RemoveMovieToWatchList)
  removeWatchList(ctx: StateContext<AppStateModel>, {id}: RemoveMovieToWatchList) {
    const state = ctx.getState();
    ctx.setState({...state, watchList: state.watchList.filter(movie => movie.id !== id)})
    ctx.dispatch(new UpdateMovieStatus(id, 'remove'));
  }

  @Action(GetWatchList)
  getWatchList(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({...state, watchList: [...state.watchList]})
  }


  @Action(UpdateMovieStatus)
  updateMovieStatus(ctx: StateContext<AppStateModel>, {id, status}: UpdateMovieStatus) {
    const state = ctx.getState();
    const movie = state.movies.find(movie => movie.id === id);
    if (movie) {
      movie.listed = status === 'add';
    }
    // ctx.patchState({movies: [...state.movies]})
    ctx.setState({...state, movies: state.movies})
  }


  // Selectors
  @Selector([AppState])
  static movies(state: AppStateModel) {
    return state.movies;
  }

  @Selector([AppState])
  static selectedMovie(state: AppStateModel) {
    return state.selectedMovie;
  }

  @Selector()
  static watchList(state: AppStateModel) {
    return state.watchList;
  }


  @Selector()
  static getSortOrder(state: AppStateModel) {
    return state.sortBy;
  }
}
