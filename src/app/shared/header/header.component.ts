import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartLocalstorageService} from '../../services/service.index';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  private numeroArticulos:number=0;
  constructor(private cartLocalStorageService: CartLocalstorageService,private router:Router,  private activatedRoute: ActivatedRoute) {

  }

  private abrirCesta():void{

    if(this.numeroArticulos === 0){
      let shoppingCart:any = document.getElementsByClassName('shopping__cart');
      let bodyOverlay:any = document.getElementsByClassName('body__overlay');
      shoppingCart[0].classList.add('shopping__cart__on');
      bodyOverlay[0].classList.add('is-visible');
    }else{
      // this.router.navigate('/checkout');
      console.log("ROUTER");
      this.router.navigate(['/checkout']);
    }



  }

  ngOnInit() {
    if(!isNullOrUndefined(this.cartLocalStorageService.getArticlesLocalStorage())){
      this.numeroArticulos = this.cartLocalStorageService.getArticlesLocalStorage().length;
    }
  }

}
