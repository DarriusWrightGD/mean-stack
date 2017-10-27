import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

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
        this.router.navigateByUrl('/');
      },
      error => console.error(error)
    );

    form.reset();
  }
}
