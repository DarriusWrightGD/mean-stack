import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../home/home.actions';
import * as fromAuth from '../store/auth.reducer';
import { SigninUser } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,
  private store: Store<fromAuth.FeatureState>) { }

  ngOnInit() {
  }

  public onSignIn(form: NgForm) {
    this.authService.signin(new User(
      form.value.userData.email,
      form.value.userData.password
    ))
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.store.dispatch(new SigninUser({token: data.token, user: this.authService.getUser()}));
        this.router.navigateByUrl('/');
      },
      error => console.error(error)
    );

    form.reset();
  }
}
