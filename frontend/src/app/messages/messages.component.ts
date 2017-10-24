import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageInputComponent } from './message-input/message-input.component';
import { CanDeactivateComponent } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, CanDeactivateComponent {
  @ViewChild('messageInput')
  public messageInput: MessageInputComponent;

  constructor() { }

  ngOnInit() {
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    const canDeactivate =  !this.messageInput.hasChanges();

    if (!canDeactivate) {
      return confirm('Would you like to discard your message?');
    }

    return canDeactivate;
  }

}
