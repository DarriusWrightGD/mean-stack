import {Routes, RouterModule} from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const ERROR_ROUTES: Routes = [
  {path: 'not-found', component: ErrorPageComponent, data: {errorMessage: 'Page not found!'}}
];

export const errorRouting = RouterModule.forChild(ERROR_ROUTES);
