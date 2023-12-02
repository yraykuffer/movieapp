import { Component, Input, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Movie } from 'src/app/models/types';
import { GetMovies, GetWatchList, SortMovies } from 'src/app/store/app.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  @Input() movies!: Movie[];
  @Input() listTitle!: string;

  sortBy: string = 'title';
  order: 'asc' | 'desc' = 'asc';


  @Select(AppState.movies) movies$!: Observable<Movie[]>;

  title: string = 'Featured Movies';

  constructor(public store: Store, public activatedRoute: ActivatedRoute) {

    this.store.dispatch([new GetWatchList(), new GetMovies()]);
    this.store.select(AppState.getSortOrder).subscribe(sort => {
      this.sortBy = sort.by;
      this.order = sort.order;
      this.store.dispatch(new SortMovies(sort));
    })

  }

  ngOnInit(): void {

  }

  sortMovie() {
    console.log(this.sortBy)
    this.store.dispatch(new SortMovies({
      by: this.sortBy,
      order: this.order
    }));
  }

  toggleOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.store.dispatch(new SortMovies({
      by: this.sortBy,
      order: this.order
    }));
  }

}
