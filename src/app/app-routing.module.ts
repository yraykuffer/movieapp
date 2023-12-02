import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/movies",
    pathMatch: "full",
    data: {
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
        },
        {
          path: '',
          label: 'Movies'
        }
      ]
    }
  },
  {
    path: "movies",
    component: MovieListComponent,
    data: {
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
        },
        {
          path: '',
          label: 'Movies'
        }
      ]
    }
  },
  {
    path: "movies/:id",
    component: MovieDetailsComponent,
    data: {
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
        },
        {
          path: '/movies',
          label: 'Movies'
        },
        {
          path: '',
          label: 'Detail'
        }
      ]
    }
  },
  {
    path: "watchlist",
    component: WatchListComponent,
    data: {
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
        },
        {
          path: '/movies',
          label: 'Movies',
        },
        {
          path: '',
          label: 'Watchlist'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
