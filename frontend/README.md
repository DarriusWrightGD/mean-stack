# MeanStack

## Best Practices

### Modules

It best to have a CoreModule (services), SharedModule (shared components), and FeatureModules (features).

### Lazy Loading

Lazy load your feature modules, this will give you a performance boost for your application if you do not have to load the entire application every time.

### Project size

npm install -g source-map-explorer
npm run build -- --prod --sourcemaps=true
source-map-explorer vendor.123cr2c.bundle.js

This will inform you of what imports that you are using, and how much space that they are taking up.

## Routing

Navigation should only happen through the directive routerLink, not href.

Note: **href will cause the page to completely reload, which is unesscary**

``` html
<a routerLink="/home">Home</a>
<a [routerLink]="'/home'">Home</a>
<a [routerLink]="['home']">Home</a>
```

When using relative paths, without a starting slash, the link that you specify will be appended to the end of the link.

### Active Route

Angular gives a specific directive to add add classes to the current active router link.

``` html
<a routerLinkActive="active" [routerLink]="'/home'">Home</a>
```

This will add the specified class when the routerLink on the element or subelement has been selected.

Note: **There are times where you need to set options for the selected routerLink. This is where routerLinkActiveOptions come into play.**

``` html
<a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"[routerLink]="'/home'">Home</a>

```

### Programatic Navigation

This occurs through the injejction of the router into a class, then you can execute the **navigate** function.

``` typescript
...
export class HomeComponent {
  constructor(private router: Router) {

  }

  public onLoadServer () {
    this.router.navigate(['/servers'])
  }
}
```

Note: **Unlike the routerLink, the injected router will not know what page you are currently on. Therefore if you want relative paths you will have to supply them in the extra parameter.**

``` typescript
...
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  public onLoadServer () {
    this.router.navigate(['/servers'], {this.relativeTo: this.route})
  }
}
```

### Routing parameters

In order to have a route receive an id you must add a colon, and then the name of your parameter to the route as shown below.

``` typescript

const appRoutes: Routes = [
  ...
  {path: 'users/:id', component: UserComponent}
  ...
]

```

In order to retreive the parameter that was set we need to take advantage of the ActivatedRoute class.

``` typescript
...
export class HomeComponent implements OnInit {

  private id:string;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  public ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // in case the parameters change while still on this route.
    // If you know 100% of the time that the component will not go to the same url then you do not need this code.
    this.route.params
      .subscribe(p => this.id = p['id'])
  }

}
```

### Query Parameters, and Fragments

#### In html

``` html
<a routerLinkActive="active" [routerLink]="'/home'"
[queryParams] = "{allowChanges: '1'}"
[fragment] = "loading"
>Home</a>
```

#### In Code
``` typescript
...
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  public onLoadServer () {
    this.router.navigate(['/servers'], {queryParams: {allowChanges:'1'}, fragment: 'loading'})
  }
}
```

Note: **If you would like to keep the query parameters that came from the previous route, you have the ability to simply add "queryParamsHandling:'preserve'" to your extra parameters.**


#### Retreival


``` typescript
...
export class HomeComponent implements OnInit {

  private id:string;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  public ngOnInit() {
    let allowChanges = this.route.snapshot.queryParams['allowChanges'];
    let fragment = this.route.snapshot.fragment;

    this.route.queryParams
      .subscribe(p => allowChanges = p['allowChanges'])
    this.route.fragment
      .subscribe(f => fragment = f)

  }

}
```

Note: **When you subscribe to anything from the ActivatedRoute angular will automatically unsubscribe from the observable. Whereas with your custom observables you will need to unsubscribe yourself.**

### Child Routes

``` typescript
// You will also need to add a <router-outlet> to the UsersComponent page.
const appRoutes: Routes = [
  ...
  {path: 'users', component: UsersComponent, children: [
    {path: ':id', component: UserComponent}
  ]}
  ...
]

```

### Redirect and Wildcard Routes

The most useful case for these two features are for handlings pages that are not supported by your angular application.

i.e.


``` typescript
// You will also need to add a <router-outlet> to the UsersComponent page.
const appRoutes: Routes = [
  ...
  {path: 'not-found', component: PageNotFoundComponent },
  {path: '**', redirectTo: '/not-found'}
]

```

### Routing Module

As you gain a lot of routes, it can become aparent that you need a higher level abstraction. The current recommended way is to create a RoutingModule for your application.

i.e.

``` typescript
import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { authRouting } from './auth/auth.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/messages', pathMatch: 'full' },
  {path: 'messages', component: MessagesComponent },
  {path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

```

### Route Guards

Logic that occurs before entering a route, and after you have left a route.

#### CanActivate and CanActivateChild

These interfaces can be used in conjunction with your array of routes to decide if a user can visit a route. CanActivate affects the route that it is attacted to, whereas CanActivateChild effects the children of the route that it is attacted to.

i.e.

``` typescript
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }else {
      this.router.navigate(['/auth', 'signin']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}

```

``` typescript
// You will also need to add a <router-outlet> to the UsersComponent page.
const appRoutes: Routes = [
  ...
  {path: 'users', canActivateChild: [AuthGuardService], component: UsersComponent, children: [
    {path: ':id', component: UserComponent}
  ]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]}
  ...
]

```

#### CanDeactivate

This works similar to the CanActivate interface, but for deactivation.


``` typescript
// You will also need to add a <router-outlet> to the UsersComponent page.
const appRoutes: Routes = [
  ...
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]}
  canDeactivate: [CanDeactivateGuardService]
  ...
]

```

### Resolver

A great feature of angular is that you can resolve essential data to a component before it ever reaches it. This can be done through the resolver interface. Simply inherit from the Resolve and specify it's type. Then specify the resolver in your router.


``` typescript
const APP_ROUTES = [ 
  ...
  {path: 'messages', resolve: {messages: MessageResolverService},
  ...
]
```

``` typescript
@Injectable()
export class MessageResolverService implements Resolve<Array<Message>> {

  constructor(private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Message[] | Observable<Message[]> | Promise<Message[]> {
    return this.messageService.getMessages();
  }
}
```


``` typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageInputComponent } from './message-input/message-input.component';
import { CanDeactivateComponent } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, CanDeactivateComponent {
...
  public messages: Message[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .subscribe( data =>
        this.messages = data['messages']
      );
  }
...
}

```

### Location Strategies

Note: **The server hosting your application must redirect to the index.html page on 404s, thus it will be able to always handle the route.**

If you cannot get the 404 redirect to work you can specify **useHash** in your router and this will allow you to tell the server to ignore your route. Though if possible you should not use this techinque.

## Observable

What is an observable? A data source that will emit data to the observer. There can be multiple events that are emitted to the observer.

The observer has three ways of handling data from an Observable.

- Handle data
- Handle error
- Handle completion **Observables do not have to have a completion.**

Observables is simply a different approach to handing async calls.

### Subscribe and Unsubscribe

``` typescript
...
export class AppComponent implements OnInit, OnDestroy {
  private numbersObservable: Subscription;
  private customSubscription: Subscription;

  ngOnDestroy(): void {
    this.customSubscription.unsubscribe();
  }

  ngOnInit(): void {

    const myNumbers = Observable.interval(1000);

    this.numbersObservable = myNumbers.subscribe(
      (number) => console.log(number)
    );

    const myObservable = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('First package');
      }, 2000);

      setTimeout(() => {
        observer.next('Second package');
      }, 4000);

      setTimeout(() => {
        // observer.error('Failed!');
        observer.complete();
      }, 5000);
    });

    this.customSubscription =  myObservable.subscribe((data: string) => {
      console.log(data);
    }, (error: string) => {
      console.log(error);
    }, () => console.log('completed'));
  }
}
```

### Subject

This is both an observer and an observable. As it can seen new messages via the next operator and you can subscribe to the messages that are being outputted.

Note: **When subscribing to a Subject you need to be sure that you unsubscribe from it once you are done, for example in ngOnDestroy.**

## Template Driven vs Reactive Forms

### Template Driven Forms

These are inferred by angular through the Forms Object from the dom.

Note: Validators
https://angular.io/api/forms/Validators

When there is an issue with the form, angular will cascade and add the ng-invalid class to all elements within the form.

### Reactive

The form is created programmatically and synchronized with the DOM. This route gives you greater control over the form.

With reactive forms to attact the html form to the angular form group that has been created you will need to use the following directive.

``` html
<form [formGroup]="signupForm">
  <input formControlName="firstName">
  <span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched">Please enter a first name</span>
  ...
</form>
```

``` typescript
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  ngOnInit() {
    signupForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required)
      ...
    });
  }
}

```


## Pipes

These allow you to transform output in your application. For example transforming a string to all uppercase.

``` html
<p>{{ username | uppercase }}</p>
```

### Custom Pipes

In order to create a pipe you will need to add the Pipe decorator to your class. It is best practice to implement the PipeTransform interface.

``` typescript
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number) {

    const shortenAmount = limit || 10;

    if (value.length > shortenAmount) {
      return value.substr(0, shortenAmount) + '...';
    }

    return value;
  }
}
```

### Pure vs Impure Pipes

Angular does not rerun your pipe if an array or object updates. This is a high performance cost. This can be force by setting the **pure property to false** within the **Pipe** decorator.

### Async Pipe

This pipe is for converting promises and observables into the data that we expect.

``` html
<p>{{ appStatus | async | uppercase }}</p>
```


## Ngrx

Use to manage the state of an application.

State describes what the user sees, and some pieces of that state we would like to store.

In redux you have one store that manages the state of the application. To change that state you will create actions which upon dispatch will be sent to a reducer which will change the state.
