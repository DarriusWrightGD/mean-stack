import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { MessageListComponent } from './message-list/message-list.component';
import { MessagesComponent } from './messages.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../shorten.pipe';


@NgModule({
  declarations: [
    MessageComponent,
    MessageListComponent,
    MessagesComponent,
    MessageInputComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [MessageService]
})
export class MessageModule {

}
