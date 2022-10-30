import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LogsComponent } from './components/logs/logs.component';

import { AuthGuard } from './shared/auth.guard';
import { UploadLogComponent } from './components/upload-log/upload-log.component';

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: LogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upload',
    component: UploadLogComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}