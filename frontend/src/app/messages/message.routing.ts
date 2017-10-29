import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages.component';

const MESSAGE_ROUTES: Routes = [
  {path: '', component: MessagesComponent, pathMatch: 'full' }
];


export const messageRouting = RouterModule.forChild(MESSAGE_ROUTES);
