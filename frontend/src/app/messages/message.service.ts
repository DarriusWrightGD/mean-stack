import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class MessageService {

  private messages: Message[] = [];
  private apiUrl = environment.apiUrl;
  public editMessageEvent = new EventEmitter();


  constructor(private http: Http) { }

  public addMessage(message: Message): Observable<Message> {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .post( this.apiUrl + '/message', body, {headers: headers})
      .map( response => {
        const result = response.json();
        const newMessage = new Message(result.content, 'User', result._id);
        this.messages.push(newMessage);
        return newMessage;
      })
      .catch(error => Observable.throw(error.json()));
  }


  public getMessages(): Observable<Message[]> {
    return this.http
      .get(this.apiUrl + '/message')
      .map( response => {
        const messages = response.json();
        this.messages = messages.map(m => new Message(m.content, 'User', m._id));
        return this.messages;
      })
      .catch( error => Observable.throw(error));
  }

  public editMessage(message: Message) {
    this.editMessageEvent.emit(message);
  }

  public updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .patch(`${this.apiUrl}/message/${message.messageId}`, body, {headers: headers})
      .map( response => <Message>response.json())
      .catch(error => Observable.throw(error.json()));
  }

  public deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http
      .delete(`${this.apiUrl}/message/${message.messageId}`)
      .map( response => response.json())
      .catch(error => Observable.throw(error.json()));

  }
}
