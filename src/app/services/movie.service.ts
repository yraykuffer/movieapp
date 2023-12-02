import { Injectable } from '@angular/core';
import { Movie, SORT_BY, Sort } from '../models/types';

const LS_MOVIE = 'movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getWatchList(): Movie[] {
    const lsMovies = localStorage.getItem(LS_MOVIE);
    if (lsMovies) {
      return JSON.parse(lsMovies) as Movie[];
    } else {
      return [];
    }
  }


  addToWatchList(movie: Movie) {
    const movies = this.getWatchList();
    const exists = movies.find(m => m.id === movie.id);
    if (!exists) {
      localStorage.setItem(LS_MOVIE, JSON.stringify([...movies, movie]));
    }
  }

  removeToWatchList(id: number) {
    const movies = this.getWatchList().filter(mov => mov.id !== id);
    localStorage.setItem(LS_MOVIE, JSON.stringify(movies));
  }


  sortMovies(movies: Movie[], sort: Sort): Movie[] {
    let sortedMovies: Movie[] = [];
    if (movies.length) {
      if (sort.by === SORT_BY.TITLE) {
         movies.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }

      if (sort.by === SORT_BY.RELEASED_DATE) {
        movies.sort((a, b) => {
         return Date.parse(a.releasedDate) - Date.parse(b.releasedDate)
       });
     }
      if (sort.order === 'desc') {
        movies.reverse();
      }
    }

    return [...movies];
  }
}
