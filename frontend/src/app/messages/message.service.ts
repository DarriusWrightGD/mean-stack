import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService {

  private messages: Message[] = [];
  private apiUrl = environment.apiUrl;
  public editMessageEvent = new EventEmitter();


  constructor(private http: Http, private errorService: ErrorService) { }

  public addMessage(message: Message): Observable<Message> {
    const body = JSON.stringify(message);


    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http
      .post( `${this.apiUrl}/message${this.token}`, body, {headers: headers})
      .map( response => {
        const result = response.json();
        const newMessage = new Message(result.content, result.user.firstName, result._id, result.user._id);
        this.messages.push(newMessage);
        return newMessage;
      })
      .catch((error) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  public getMessages(): Observable<Message[]> {
    return this.http
      .get(this.apiUrl + '/message')
      .map( response => {
        const messages = response.json();
        this.messages = messages.map(m => new Message(m.content, m.user.firstName, m._id, m.user._id));
        return this.messages;
      })
      .catch(error => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  public editMessage(message: Message) {
    this.editMessageEvent.emit(message);
  }

  public updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .patch(`${this.apiUrl}/message/${message.messageId}${this.token}`, body, {headers: headers})
      .map( response => <Message>response.json())
      .catch(error => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  public deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http
      .delete(`${this.apiUrl}/message/${message.messageId}${this.token}`)
      .map( response => response.json())
      .catch(error => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  private get token() {
    return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
  }
}
