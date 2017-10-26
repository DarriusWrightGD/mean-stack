import { Component, OnInit, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
