import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './auth/authentication.component';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error/error.component';
import { ErrorService } from './errors/error.service';
import { MessageModule } from './messages/message.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { CanDeactivateGuardService } from './messages/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    ErrorComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MessageModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, ErrorService, AuthGuardService, CanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
