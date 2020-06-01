import {Component, isDevMode, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartLocalstorageService} from '../../services/service.index';
import {isNullOrUndefined} from 'util';
import {EventEmiterService} from '../../services/emit/emit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  private numeroArticulos:number=0;
  constructor(private _eventEmiter: EventEmiterService,private cartLocalStorageService: CartLocalstorageService,private router:Router,  private activatedRoute: ActivatedRoute) {


  }


  private abrirCesta():void{
    this._eventEmiter.dataStr.subscribe(data =>{if (isDevMode()) console.log("------TEST "+data);});
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
 private getNumberArticles():void{
   this.numeroArticulos = this.cartLocalStorageService.getArticlesLocalStorage().length;
 }
  ngOnInit() {
    this._eventEmiter.dataStr.subscribe((data) =>{
      // this.numeroArticulos = 8;
      this.getNumberArticles();
    }
  )
    if(!isNullOrUndefined(this.cartLocalStorageService.getArticlesLocalStorage())){
      this.getNumberArticles();
    }
  }

}
