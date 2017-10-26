import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { authRouting } from './auth/auth.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';
import { CanDeactivateGuardService } from './messages/can-deactivate-guard.service';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { MessageResolverService } from './messages/message-resolver.service';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/messages', pathMatch: 'full' },
  {path: 'messages', resolve: {messages: MessageResolverService},
    canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuardService], component: MessagesComponent },
  {path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
  {path: 'not-found', component: ErrorPageComponent, data: {errorMessage: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  // imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
