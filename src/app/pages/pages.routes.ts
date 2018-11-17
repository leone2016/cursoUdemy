import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent, PagesComponent, ShopComponent, ShoppingCartComponent, WishlistComponent} from './pages.index';


const pagesRoutes : Routes = [
  {
    path: '',
    component: PagesComponent,
              children: [
                {path: 'shop', component: ShopComponent },
                {path: 'shoppingCart', component: ShoppingCartComponent },
                {path: 'whisList', component: WishlistComponent },
                {path: 'checkout', component: CheckoutComponent },
                { path: '', redirectTo: '/shop', pathMatch: 'full'}
              ]
  }
];

export const PAGES_ROUtES = RouterModule.forChild(pagesRoutes)
//forRoot se usa cuando es la ruta principal
//forChild se usa cuando se tiene un router outlet dentro de otro router outlet
