import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/types';
import { AddMovieToWatchList, GetMovies } from 'src/app/store/app.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent {

  @Select(AppState.watchList) watchList$!: Observable<Movie[]>;
  @Select(AppState.movies) movies$!: Observable<Movie[]>;

  constructor(private store: Store) {
    this.store.dispatch(new GetMovies());

    this.movies$.subscribe((movies) => {
      console.log(movies)
      this.store.dispatch([new AddMovieToWatchList(movies[1]), new AddMovieToWatchList(movies[0])]);
    });

    this.watchList$.subscribe(console.log)
  }

}
