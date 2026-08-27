import { Routes } from '@angular/router';
import { Index } from './page/index';
import { Dashboard } from './page/dashboard/dashboard';
import { Home } from './page/home/home';

export const routes: Routes = [

    { path: '', redirectTo: 'index', pathMatch: 'full' },

    { path: 'index', component: Index },

    { path: 'home', component: Home },

    { path: 'dashboard', component: Dashboard }

];