import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    const requestClone = req.clone({params: this.tokenParam});
    return next.handle(requestClone);
  }

  private get tokenParam(): HttpParams {
    let params = new HttpParams();

    if (localStorage.getItem('token')) {
      params = params.set('token', localStorage.getItem('token'));
    }

    return params;
  }
}
