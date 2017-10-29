import { Injectable } from '@angular/core';

import {Error} from './error';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorService {
  errorOccurred = new Subject<Error>();
  constructor() { }

  public handleError(error: any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.next(errorData);
  }

}
