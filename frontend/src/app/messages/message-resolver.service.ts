import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Injectable()
export class MessageResolverService implements Resolve<Array<Message>> {

  constructor(private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Message[] | Observable<Message[]> | Promise<Message[]> {
    return this.messageService.getMessages();
  }

}
