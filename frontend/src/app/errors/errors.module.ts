import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { errorRouting } from './errors.routing';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    errorRouting
  ],
  declarations: [ErrorPageComponent],
  exports: [ErrorPageComponent]
})
export class ErrorsModule { }
