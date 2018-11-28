import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { APP_ROUTES } from './app.routes';

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//COMPONENTS
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {PagesModule} from './pages/pages.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceModule} from './services/service.module';
import {LocalStorageModule} from 'angular-2-local-storage';
import {environment} from '../environments/environment';
import { SearchArticlePipe } from './pipes/search-article.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialDesingModule} from './material-desing.module';
import {ImageZoomModule} from 'angular2-image-zoom';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchArticlePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    BrowserAnimationsModule,
    MaterialDesingModule,
    ImageZoomModule,
    LocalStorageModule.withConfig({
      prefix: environment.localStorageKey,
      storageType: 'localStorage'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
