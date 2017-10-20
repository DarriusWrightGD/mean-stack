import { Component, OnInit } from '@angular/core';

import { Error } from './../error';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public error: Error;
  public display = 'none';

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.errorOccurred
    .subscribe(error => {
      this.error = error;
      this.display = 'block';
    });
  }

  public onErrorHandled() {
    this.display = 'none';
  }

}
