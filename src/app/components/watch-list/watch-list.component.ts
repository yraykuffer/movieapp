import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { Movie } from 'src/app/models/types';
import { AddMovieToWatchList, GetMovies, GetWatchList, SortMovies, SortWatchList } from 'src/app/store/app.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['../movie-list/movie-list.component.css']
})
export class WatchListComponent {

  @Input() movies!: Movie[];
  @Input() listTitle!: string;

  sortBy: string = 'title';
  order: 'asc' | 'desc' = 'asc';


  @Select(AppState.watchList) movies$!: Observable<Movie[]>;

  title: string = 'Movies on Watchlist';

  constructor(public store: Store, public activatedRoute: ActivatedRoute) {

    this.store.dispatch([new GetWatchList()]);
    this.store.select(AppState.getSortOrder).pipe(take(1)).subscribe(sort => {
      console.log('sort select', sort)
      this.sortBy = sort.by;
      this.order = sort.order;
      this.store.dispatch(new SortWatchList(sort));
    })

  }

  ngOnInit(): void {

  }

  sortMovie() {
    console.log(this.sortBy)
    this.store.dispatch(new SortWatchList({
      by: this.sortBy,
      order: this.order
    }));
  }

  toggleOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.store.dispatch(new SortWatchList({
      by: this.sortBy,
      order: this.order
    }));
  }

}
