import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // TODO: look up formbuilder

  public signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      }),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, Validators.required),
    });
  }

  public onSignUp() {
    const user = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.firstName,
      this.signupForm.value.lastName
    );

    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    this.signupForm.reset();
  }

}
