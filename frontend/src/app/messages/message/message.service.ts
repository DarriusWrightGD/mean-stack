import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { Message } from './message.model';
import { ErrorService } from '../../core/error/error.service';

@Injectable()
export class MessageService {

  private messages: Message[] = [];
  private apiUrl = environment.apiUrl;
  public editMessageEvent = new Subject<Message>();
  private contentHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private errorService: ErrorService) { }

  public addMessage(message: Message): Observable<Message> {
    const body = JSON.stringify(message);

    return this.http
      .post<any>( `${this.apiUrl}/message`, body, {
        headers: this.contentHeaders
      })
      .map( result => {
        const newMessage = new Message(result.content, result.user.firstName, result._id, result.user._id);
        this.messages.push(newMessage);
        return newMessage;
      })
      .catch((error) => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }


  public getMessages(): Observable<Message[]> {
    return this.http
      .get<any[]>(this.apiUrl + '/message', {
        params: new HttpParams()
      })
      .map( messages => {
        this.messages = messages.map(m => new Message(m.content, m.user.firstName, m._id, m.user._id));
        return this.messages;
      })
      .catch(error => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  public editMessage(message: Message) {
    this.editMessageEvent.next(message);
  }

  public updateMessage(message: Message) {
    const body = JSON.stringify(message);
    return this.http
      .patch<any>(`${this.apiUrl}/message/${message.messageId}`, body, {
        headers: this.contentHeaders
      })
      .catch(error => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  public deleteMessage(message: Message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http
      .delete<any>(`${this.apiUrl}/message/${message.messageId}`)
      .catch(error => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }
}
