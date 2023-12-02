import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MessageInfo } from './models/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'movieapp';
  breadcrumbs: any[] = [];
  @Select(AppState.counter) counter$!: Observable<number>;
  @Select(AppState.showMessage) showMessage$!: Observable<any>;
  alert!: MessageInfo;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        console.log(event.snapshot.data, event.snapshot);
        this.breadcrumbs = event.snapshot.data['breadcrumbs'];
      }
    });

    this.showMessage$.subscribe(alert => {
      this.alert = alert;
    })
  }
}
