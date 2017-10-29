import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { ErrorService } from './error/error.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CanDeactivateGuardService } from '../shared/can-deactivate-guard/can-deactivate-guard.service';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [ErrorComponent, HeaderComponent],
  imports: [SharedModule, AppRoutingModule ],
  exports: [ErrorComponent, HeaderComponent, AppRoutingModule],
  providers: [ AuthService, ErrorService, AuthGuardService, CanDeactivateGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class CoreModule { }
