import { Component, OnInit, Input } from '@angular/core';
import {Message} from './message.model';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  public message: Message;


  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  public onEdit() {
    this.messageService.editMessage(this.message);
  }

  public onDelete() {
    this.messageService.deleteMessage(this.message)
      .subscribe();
  }

  public belongsToUser() {
    return localStorage.getItem('userId') === this.message.userId;
  }
}
