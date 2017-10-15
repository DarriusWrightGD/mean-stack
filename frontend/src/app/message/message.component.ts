import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Message} from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  public message: Message;

  @Output()
  public editClicked = new EventEmitter<Message>();

  @Output()
  public deleteClicked = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }


  public onEdit() {
    console.log('onEdit called');
    this.editClicked.emit(this.message);
  }

  public onDelete() {
    console.log('onDelete called');
    this.deleteClicked.emit(this.message);
  }
}
