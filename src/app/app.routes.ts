import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
];

export const RoutingDefined: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
