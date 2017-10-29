import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageInputComponent } from './message-input/message-input.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { CanDeactivateComponent } from '../shared/can-deactivate-guard/can-deactivate-guard.service';
import { Message } from './message/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, CanDeactivateComponent {
  @ViewChild('messageInput')
  public messageInput: MessageInputComponent;

  public messages: Message[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe( data =>
        this.messages = data['messages']
      );
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    const canDeactivate =  !this.messageInput.hasChanges();

    if (!canDeactivate) {
      return confirm('Would you like to discard your message?');
    }

    return canDeactivate;
  }

}
