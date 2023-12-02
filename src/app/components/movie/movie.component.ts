import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Movie } from 'src/app/models/types';
import { AddMovieToWatchList, RemoveMovieToWatchList } from 'src/app/store/app.actions';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie!: Movie;
  @Input() onWatchList!: boolean;
  constructor(private store: Store) {}

  addToWatchList() {
    if (!this.movie.listed) {
      this.movie.listed = true;
      this.store.dispatch(new AddMovieToWatchList(this.movie));
    } else {
      this.movie.listed = false;
      this.store.dispatch(new RemoveMovieToWatchList(this.movie.id));
    }
  }
}
