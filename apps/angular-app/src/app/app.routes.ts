import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
    {path: 'categories', component: HomeComponent, canActivate: [authGuard]},
    {path: 'categories-list', component: ListCategoryComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
