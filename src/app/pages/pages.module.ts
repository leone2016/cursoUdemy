import {ShopComponent, ShoppingCartComponent, CheckoutComponent, WishlistComponent, PagesComponent} from './pages.index';
import {PAGES_ROUtES} from './pages.routes';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SlideshowModule} from 'ng-simple-slideshow';


@NgModule({
  declarations: [
    ShopComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    WishlistComponent,
    PagesComponent,

  ],
  exports:[
    ShopComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    WishlistComponent,
    PagesComponent
  ],
  imports:[SharedModule,PAGES_ROUtES,FormsModule,BrowserModule, SlideshowModule]

})
export class PagesModule{}
