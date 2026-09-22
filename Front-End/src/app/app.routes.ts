import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((module) => module.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((module) => module.LoginComponent)
  },
  {
    path: 'registration',
    loadComponent: () => import('./pages/registration/registration').then((module) => module.RegistrationComponent)
  },
  {
    path: 'register',
    pathMatch: 'full',
    redirectTo: 'registration'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
