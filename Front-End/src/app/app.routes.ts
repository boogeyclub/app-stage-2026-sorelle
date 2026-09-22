import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'CacaoMarket | Cocoa trade with confidence',
    loadComponent: () => import('./pages/landing/landing').then((module) => module.LandingComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
