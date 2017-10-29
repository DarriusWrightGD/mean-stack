import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { authRouting } from './auth/auth.routing';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { MessageResolverService } from './messages/message-resolver.service';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/messages', pathMatch: 'full' },
  {path: 'messages', canLoad: [AuthGuardService], loadChildren: './messages/message.module#MessageModule' },
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {path: 'errors', loadChildren: './errors/errors.module#ErrorsModule'},
  {path: '**', redirectTo: '/errors/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules})],
  // imports: [RouterModule.forRoot(APP_ROUTES, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
