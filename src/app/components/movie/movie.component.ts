import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/types';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie!: Movie;
}
