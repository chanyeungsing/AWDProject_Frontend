import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppLayout } from './layout/component/app.layout';
import { MatNavComponent } from './mat-nav/mat-nav.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
    // {
    //     path: 'Home',
    //     redirectTo: '/',
    //     pathMatch: 'full'

    // },
    // {
    //     path: 'Search',
    //     component: SearchPageComponent
    // },
    // {
    //     path: 'Admin',
    //     component: AdminPageComponent
    // }
    {
        path: '',
        component: AppLayout,
        children: [
            {path: '', component: MatNavComponent},
            { path: 'search', component: SearchPageComponent },
            { path: 'crud', component: CrudComponent },
        ]
    },
];
