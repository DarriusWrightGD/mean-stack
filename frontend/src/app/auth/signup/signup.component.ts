import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
  private forbiddenFirstNames = ['James', 'Jones'];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
      'firstName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'lastName': new FormControl(null, Validators.required),
      }),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ], this.forbiddenEmails),
      'password': new FormControl(null, Validators.required),
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    // this.signupForm.statusChanges.subscribe(
    //   status => console.log(status)
    // );

  }

  public onSignUp() {
    const user = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.userData.firstName,
      this.signupForm.value.userData.lastName
    );

    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    this.signupForm.reset();
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenFirstNames.includes(control.value) ) {
      return {'nameIsForbidden': true };
    }
  }


  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }else {
          resolve(null);
        }
      }, 5000);
    });
  }
}
