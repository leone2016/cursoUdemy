import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './login/register.component';
import {LoginComponent} from './login/login.component';
import {PagenotfoundComponent} from './shared/pagenotfound/pagenotfound.component';


const routes: Routes =[
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(routes);
