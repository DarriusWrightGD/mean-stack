import { Injectable } from '@angular/core';
import {
  CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot,
  Router, CanActivateChild, CanLoad, Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isAuthenticated();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    if (this.authService.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate(['/auth', 'signin']);
    }
  }
}
