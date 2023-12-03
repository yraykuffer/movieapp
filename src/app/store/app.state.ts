import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppStateModel, Movie, Sort } from '../models/types';
import { Injectable } from '@angular/core';
import { MOVIES } from './dummy';
import { AddMovieToWatchList, GetMovies, GetSelectedMovie, GetWatchList, HideAlert, RemoveMovieToWatchList, ShowAlert, SortMovies, SortWatchList, UpdateMovieStatus } from './app.actions';
import { MovieService } from '../services/movie.service';

@State<AppStateModel>({
  name: 'movieapp',
  defaults: {
    movies: MOVIES,
    selectedMovie: null,
    watchList: [],
    sortBy: {
      by: 'title',
      order: 'asc',
    },
    showMessage: null
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
    const watchList = this.movieService.getWatchList();
    if (watchList.length) {
      const movieIds = watchList.map(({id}) => id)
      const movies = state.movies.map(mov => {
         if(movieIds.includes(mov.id)) {
          mov.listed = true;
         };
         return mov;
      });

      ctx.setState({...state, movies, watchList})
    }

  }


  @Action(UpdateMovieStatus)
  updateMovieStatus(ctx: StateContext<AppStateModel>, {id, status}: UpdateMovieStatus) {
    const state = ctx.getState();
    const movie = state.movies.find(movie => movie.id === id);
    if (movie) {
      movie.listed = status === 'add';

      if (status === 'add') {
        this.movieService.addToWatchList(movie);
      } else {
        this.movieService.removeToWatchList(id);
      }
    }
    ctx.setState({...state, movies: state.movies})
  }

  @Action(ShowAlert)
  showAlert(ctx: StateContext<AppStateModel>, {alert}: ShowAlert) {
    const state = ctx.getState();
    alert.visible = true;

    ctx.setState({...state, showMessage: alert});
    // ctx.dispatch(new HideAlert());
    const timeout = setTimeout(() => {
      ctx.dispatch(new HideAlert({...alert, visible: false}));
      clearTimeout(timeout);
    }, 2000);
  }

  @Action(HideAlert)
  hideAlert(ctx: StateContext<AppStateModel>, {alert}: ShowAlert) {
    const state = ctx.getState();

    ctx.setState({...state, showMessage: alert})
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
  static counter(state: AppStateModel) {
    return state.watchList.length;
  }


  @Selector()
  static getSortOrder(state: AppStateModel) {
    return state.sortBy;
  }

  @Selector()
  static showMessage(state: AppStateModel) {
    return state.showMessage;
  }
}
