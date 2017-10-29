import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { authRouting } from './auth.routing';
import { AuthGuardService } from './auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationComponent } from './authentication.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    SignupComponent,
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    authRouting
  ],
  exports: [AuthenticationComponent]
})
export class AuthModule {

}
