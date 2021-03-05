import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { IsAnonymousGuard } from './services/anonymous.guard';
import { IsAuthGuard } from './services/auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToItems = () => redirectLoggedInTo('/sensors');

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    ...canActivate(redirectLoggedInToItems),
    component: AuthComponent
  },
  {
    path: 'sensors',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule)
  }
];
// const routes: Routes = [
//   { path: '', redirectTo: '/auth', pathMatch: 'full' },
//   { path: 'auth', canActivate: [IsAnonymousGuard], component: AuthComponent },
//   { path: 'sensors', canActivate: [IsAuthGuard], loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule) }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
