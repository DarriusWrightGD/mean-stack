import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ShortenPipe, ErrorComponent, HeaderComponent],
  exports: [
    ShortenPipe, ErrorComponent, HeaderComponent,
    FormsModule, HttpModule, RouterModule, CommonModule
  ]
})
export class SharedModule { }
