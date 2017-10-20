import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthenticationComponent } from './authentication.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth.routing';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    authRouting
  ],
  providers: [AuthService]
})
export class AuthModule {

}
