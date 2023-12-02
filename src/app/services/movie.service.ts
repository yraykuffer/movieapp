import { Injectable } from '@angular/core';
import { Movie, Sort } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

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
