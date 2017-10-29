import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../shared/error/error.service';
import { CanDeactivateGuardService } from '../messages/can-deactivate-guard.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { MessageResolverService } from '../messages/message-resolver.service';
import { MessageService } from '../messages/message.service';

@NgModule({
  providers: [AuthService, ErrorService,
    AuthGuardService, CanDeactivateGuardService,
    MessageResolverService, MessageService
  ]
})
export class CoreModule { }
