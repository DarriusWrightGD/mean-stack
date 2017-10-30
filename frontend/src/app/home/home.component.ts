import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../auth/store/auth.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public homeState: Observable<{user: User}>;
  public homeState: Observable<any>;

  constructor(private authService: AuthService,
    private store:  Store<fromAuth.FeatureState>
  ) { }

  ngOnInit() {
    this.homeState = this.store.select('auth');
    this.homeState.do(result => {
      debugger;
    });
    // this.user = this.authService.getUser();
  }

}
