import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { AppLayout } from './layout/component/app.layout';
import { MatNavComponent } from './mat-nav/mat-nav.component';
import { CrudComponent } from './crud/crud.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: MatNavComponent },
      { path: 'search', component: SearchComponent },
      { path: 'crud', component: CrudComponent },
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
