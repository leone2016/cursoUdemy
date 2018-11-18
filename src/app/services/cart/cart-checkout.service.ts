import { Injectable } from '@angular/core';

import {ArticleModel, CartModel} from '../../models/model.index';
import {CartLocalstorageService} from './cart-localstorage.service';
import {isNullOrUndefined} from 'util';


@Injectable({
  providedIn: 'root'
})
export class CartCheckoutService {

  constructor(  private cartLocalstorageService : CartLocalstorageService ) { }
  public isCartEmpty(){
    return isNullOrUndefined(this.cartLocalstorageService.getArticlesLocalStorage());
  }

  /*
  * CARGA LISTADO PARA VISUALIZARLO EN VENTANA LATERAL
   */
  public getDatosLocalStorage(listArticulos:ArticleModel[]):ArticleModel[]{
    const listCartArticle: ArticleModel[] = [];
    for (let articuloStorage of this.cartLocalstorageService.getArticlesLocalStorage()){
      let code:number = Number(atob(articuloStorage.code));
      for( let articulo of listArticulos){
        if(code == articulo.code){
          listCartArticle.push(articulo);
        }
      }
    }
    return listCartArticle;
  }

  public getSubTotal(listCartArticle:ArticleModel[]):{subtotal:number, subtotalPromo:number}{
    let subtotal:number = 0;
    let subtotalPromo:number = 0;
    for(let articulo of listCartArticle){
      subtotalPromo=subtotalPromo + articulo.ratePromo;
      subtotal = subtotal + articulo.rate;
    }
    subtotalPromo = Number(subtotalPromo.toFixed(2));
    subtotal = Number(subtotal.toFixed(2));

    return{subtotal:subtotal, subtotalPromo:subtotalPromo}
  }
  /*
  elimina de localstorage
  */
  public eliminarDeCesta(articulo: ArticleModel):void{
    let cartModel:CartModel[] = this.cartLocalstorageService.getArticlesLocalStorage();
    for (let i=0; i < cartModel.length; i++){
      let code:number = Number(atob(cartModel[i].code));
      if(code == articulo.code){
        cartModel.splice(i, 1 );
      }
    }
    this.cartLocalstorageService.eliminarLocalStorage( cartModel );
  }



}
