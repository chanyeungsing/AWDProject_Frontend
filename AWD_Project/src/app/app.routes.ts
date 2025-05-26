import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
    {
        path: 'Home',
        redirectTo: '/',
        pathMatch: 'full'

    },
    {
        path: 'Search',
        component: SearchPageComponent
    },
    {
        path: 'Admin',
        component: AdminPageComponent
    }
];
