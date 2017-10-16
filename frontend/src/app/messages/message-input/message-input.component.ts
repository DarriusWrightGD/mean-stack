import { Component, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  public formMessage: Message;


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.editMessageEvent
      .subscribe(
      message => this.formMessage = message
      );
  }

  public onSave(form: NgForm) {
    console.log(form);
    if (form.valid) {
      if (this.formMessage) {
        this.updateMessage(form);
      } else {
        this.addMessage(form);
      }
    }

    form.resetForm();
  }

  private updateMessage(form: NgForm) {
    this.formMessage.content = form.value.content;
    this.messageService.updateMessage(this.formMessage)
      .subscribe(() => this.formMessage = null);
  }

  private addMessage(form: NgForm) {
    this.messageService
    .addMessage(new Message(form.value.content, 'Darrius'))
    .subscribe(
    message => console.log(message),
    error => console.error(error)
    );
  }

  public onClear(form: NgForm) {
    form.reset();
  }
}
