import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`${environment.apiUrl}/user`, user, {headers: headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  public signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(`${environment.apiUrl}/user/signin`, user, {headers: headers})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  public logout() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}
