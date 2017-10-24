import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { authRouting } from './auth/auth.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';
import { CanDeactivateGuardService } from './messages/can-deactivate-guard.service';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/messages', pathMatch: 'full' },
  {path: 'messages', canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuardService], component: MessagesComponent },
  {path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
