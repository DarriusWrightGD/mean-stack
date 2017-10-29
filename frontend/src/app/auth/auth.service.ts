import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { ErrorService } from '../core/error/error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private contentHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  public signup(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<any>(`${environment.apiUrl}/user`, user, {headers: this.contentHeaders})
      .catch(error => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  public signin(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<any>(`${environment.apiUrl}/user/signin`, user, {headers: this.contentHeaders})
      .catch(error => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  public logout() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}
