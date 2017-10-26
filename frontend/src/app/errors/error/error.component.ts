import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Error } from './../error';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  public error: Error;
  public display = 'none';

  private errorSubscription: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSubscription = this.errorService.errorOccurred
    .subscribe(error => {
      this.error = error;
      this.display = 'block';
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  public onErrorHandled() {
    this.display = 'none';
  }

}
