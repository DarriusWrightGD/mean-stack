import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { messageRouting } from './message.routing';
import { MessageResolverService } from './message-resolver.service';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message/message.service';
import { MessageListComponent } from './message-list/message-list.component';
import { MessagesComponent } from './messages.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent,
    MessagesComponent,
    MessageInputComponent,
  ],
  providers: [MessageService, MessageResolverService
    ,
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  imports: [ SharedModule, messageRouting ],
  exports: [MessagesComponent]
})
export class MessageModule {

}
