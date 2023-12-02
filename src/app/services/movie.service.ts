import { Injectable } from '@angular/core';
import { Movie, Sort } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getWatchList(): Movie[] {
    const lsMovies = localStorage.getItem('movies');
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
      localStorage.setItem('movies', JSON.stringify([...movies, movie]));
    }
  }

  removeToWatchList(id: number) {
    const movies = this.getWatchList().filter(mov => mov.id !== id);
    localStorage.setItem('movies', JSON.stringify(movies));
  }


  sortMovies(movies: Movie[], sort: Sort): Movie[] {
    let sortedMovies: Movie[] = [];
    if (movies.length) {
      if (sort.by === 'title') {
         movies.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }

      if (sort.by === 'releasedDate') {
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
