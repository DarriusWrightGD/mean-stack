import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages.component';
import { MessageResolverService } from './message-resolver.service';
import { CanDeactivateGuardService } from '../shared/can-deactivate-guard/can-deactivate-guard.service';

const MESSAGE_ROUTES: Routes = [
  {
    path: '',
    component: MessagesComponent,
    pathMatch: 'full',
    resolve: {messages: MessageResolverService},
    canDeactivate: [CanDeactivateGuardService]
  }
];


export const messageRouting = RouterModule.forChild(MESSAGE_ROUTES);
