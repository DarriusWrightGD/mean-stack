import { Component, OnInit, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Message } from '../message/message.model';
import { MessageService } from '../message/message.service';


@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit, OnDestroy {
  public formMessage: Message;
  @ViewChild('formElement')
  public formGroup: ElementRef;

  private editMessageSubscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.editMessageSubscription = this.messageService.editMessageEvent
      .subscribe(
      message => this.formMessage = message
      );
  }

  ngOnDestroy() {
    this.editMessageSubscription.unsubscribe();
  }

  public hasChanges(): boolean {
    return this.formGroup.nativeElement.classList.contains('ng-dirty');
  }

  public onSave(form: NgForm) {
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
    message => {},
    error => console.error(error)
    );
  }

  public onClear(form: NgForm) {
    form.reset();
  }
}
