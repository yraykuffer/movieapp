import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieapp';
  @Select(AppState.counter) counter$!: Observable<number>;
}
