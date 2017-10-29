import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ErrorsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
