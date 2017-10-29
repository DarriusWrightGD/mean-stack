import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationComponent } from './authentication.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth.routing';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AuthenticationComponent,
    SignupComponent,
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    authRouting
  ],
  exports: [AuthenticationComponent]
})
export class AuthModule {

}
