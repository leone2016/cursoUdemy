import {Injectable, isDevMode} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../../environments/environment';
import {CartModel} from '../../models/model.index';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CartLocalstorageService {

  constructor(private localStorageService: LocalStorageService) { }

  public eliminarLocalStorage(cartModel:CartModel[]):boolean{
    const localStorageKey: string = this.getLocaStorageKey();
    if(cartModel.length===0){
      this.localStorageService.remove(this.getLocaStorageKey());
    }
    return this.localStorageService.set(localStorageKey,cartModel )
  }



  public guardarLocalStorage(cartModel:CartModel):boolean{
    let acumCartModel:CartModel[]=[];

    if (isDevMode())console.log((!isNullOrUndefined(this.getArticlesLocalStorage())));
    if(!isNullOrUndefined(this.getArticlesLocalStorage())){
      for(let articuloLocalstorage  of this.getArticlesLocalStorage()){
        if( cartModel.code===articuloLocalstorage.code )
          return false;
      }
      for(let articuloLocalstorage  of this.getArticlesLocalStorage()){

        acumCartModel.push(articuloLocalstorage);
      }
    }
    acumCartModel.push(cartModel);

    if( this.localStorageService.isSupported !== true){
      return false;
    }

    const localStorageKey: string = this.getLocaStorageKey();
    return this.localStorageService.set(localStorageKey,acumCartModel )
  }
  public getArticlesLocalStorage():CartModel[]{
    return this.localStorageService.get<CartModel[]>(this.getLocaStorageKey());
  }
  public getLocaStorageKey():string{
    return environment.waki_cart.localStorageKey;
  }

}
