import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/components/users/login/login.component';
import { SignUpComponent } from './home/components/users/sign-up/sign-up.component';
import { ProfileComponent } from './home/components/users/profile/profile.component';
import { ForgotPasswordComponent } from './home/components/users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/components/users/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: '/home/posts',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
