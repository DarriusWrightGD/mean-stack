import { Component, OnInit, Input } from '@angular/core';

import { Message } from '../message/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input()
  public messages: Message [] = [];

  ngOnInit() {

  }
}
