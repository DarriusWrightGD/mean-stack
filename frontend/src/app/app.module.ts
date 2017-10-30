import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './home/home.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    StoreModule.forRoot({'home': homeReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
