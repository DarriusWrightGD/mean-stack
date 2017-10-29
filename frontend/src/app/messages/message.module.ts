import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { MessageListComponent } from './message-list/message-list.component';
import { MessagesComponent } from './messages.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { messageRouting } from './message.routing';


@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent,
    MessagesComponent,
    MessageInputComponent,
  ],
  imports: [ SharedModule, messageRouting ],
  exports: [MessagesComponent]
})
export class MessageModule {

}
