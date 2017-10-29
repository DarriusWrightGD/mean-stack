import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  declarations: [ShortenPipe],
  exports: [
    ShortenPipe,
    FormsModule, HttpClientModule, RouterModule, CommonModule
  ]
})
export class SharedModule { }
