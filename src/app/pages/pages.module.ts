import {ShopComponent, ShoppingCartComponent, CheckoutComponent, WishlistComponent, PagesComponent} from './pages.index';
import {PAGES_ROUtES} from './pages.routes';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SlideshowModule} from 'ng-simple-slideshow';
import {MaterialDesingModule} from '../material-desing.module';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {ContactComponent} from './contact/contact.component';
import {ProductsComponent} from './products/products.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    WishlistComponent,
    PagesComponent,
    ContactComponent,
    ProductsComponent

  ],
  exports:[
    ShopComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    WishlistComponent,
    PagesComponent,
    ContactComponent,
    ProductsComponent
  ],
  imports:[SharedModule,
    PAGES_ROUtES,
    FormsModule,
    BrowserModule,
    SlideshowModule,
    MaterialDesingModule,
    MatDatepickerModule, MatNativeDateModule
  ]

})
export class PagesModule{}
