import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageInputComponent } from './messages/message-input/message-input.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageService } from './messages/message.service';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './shared/header/header.component';
import { routing } from './app.routing';
import { AuthenticationComponent } from './auth/authentication.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    MessageComponent,
    MessageInputComponent,
    MessageListComponent,
    MessagesComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
