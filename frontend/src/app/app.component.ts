import { Component } from '@angular/core';
import {Message} from './message/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message = new Message ('A message', 'Darrius');

  public onEdit(message: Message) {
    console.log('App Component On Edit');
  }

  public onDelete(message: Message) {
    console.log('App Component On Delete');
  }
}
