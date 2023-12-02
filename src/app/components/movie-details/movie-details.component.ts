import { Component, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Movie } from 'src/app/models/types';
import {
  AddMovieToWatchList,
  GetSelectedMovie,
  GetWatchList,
  RemoveMovieToWatchList,
  ShowAlert,
} from 'src/app/store/app.actions';
import { AppState } from 'src/app/store/app.state';
import { Observable, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  @Select(AppState.selectedMovie) movie$!: Observable<Movie>;
  movie!: Movie;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    const id = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch([new GetWatchList(), new GetSelectedMovie(Number(id))]);

    this.movie$.pipe(take(1)).subscribe((movie) => {
      if (movie) {
        const mov = { ...movie };
        const url = this.updateYoutubeURL(mov.trailerLink as any);
        mov.trailerLink = this.sanitizeURL(url);

        this.movie = mov;
      }
    });
  }

  addToWatchList() {
    if (!this.movie.listed) {
      this.movie.listed = true;
      this.store.dispatch(new AddMovieToWatchList(this.movie));
      this.store.dispatch(
        new ShowAlert({
          type: 'info',
          message: `${this.movie.title} was successfully added`,
        })
      );
    } else {
      this.movie.listed = false;
      this.store.dispatch(
        new ShowAlert({
          type: 'info',
          message: `${this.movie.title} was successfully removed`,
        })
      );
      this.store.dispatch(new RemoveMovieToWatchList(this.movie.id));
    }
  }

  updateYoutubeURL(url: string) {
    const v = url.split('v=')[1];
    return `https://www.youtube.com/embed/${v}?si=f7YiFU9i1NcLsjbD&autoplay=1&mute=1`;
  }

  sanitizeURL(url: string) {
    const URL = this.sanitizer.sanitize(SecurityContext.URL, url) || '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL);
  }
}
