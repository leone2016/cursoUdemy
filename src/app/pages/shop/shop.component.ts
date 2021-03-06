import {Component, isDevMode, OnInit, Inject, Injectable, Output, EventEmitter} from '@angular/core';
// import {WakiAuthService} from '../../services/waki-auth/waki-auth.service';
import {bunble} from '../../../environments/bundle';
import {MaterialModel, ArticlePhotoModel, StockModel, ArticleModel, ColorMaterialModel, CartModel} from '../../models/model.index';
import {ArticlesService, CartCheckoutService, CartLocalstorageService} from '../../services/service.index';
import {map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';

import {ArticleImportCodeModel} from '../../models/article-import-code.model';
import {environment} from '../../../environments/environment';
import {isNullOrUndefined} from 'util';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {EventEmiterService} from '../../services/emit/emit.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {

  @Output() contProducts:EventEmitter<number> = new EventEmitter<number>();
  // @Output() emitEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  public articuloSingle: ArticleModel;
  public fakeArticle: boolean = true;
  public signoModeda:string =  bunble.signoDolar;
  public articulos:ArticleModel[] = [];
  public defaultImage:string = environment.defaultImage;
  public imageUrls: any[] = [];
  public listadoImportacion:ArticleImportCodeModel[] = [];
  public listadoMateriales: MaterialModel[] = [];
  public listadoColorMaterial: ColorMaterialModel[] = [];
  public listCartArticle: ArticleModel[] = [];
  public subTotal:number = 0;
  public subTotalSinPromo:number = 0;
  public img:string ="assets/images/borrar/images/bigimage00.jpg";
  public img2:string = "assets/images/borrar/smallimage.jpg";
    // imageUrls: (string | IImage)[] = [
  //   //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
  //   //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
  //   //   { url: 'https://cdxn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
  //   //   'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
  //   //   { url: 'assets/kitties.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
  //   // ];
  /*
  VARIABLES PARA SLIDER DE ARTICULOS ( QUICK VIEW )
   */
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';


  constructor( private articleService: ArticlesService,
               @Inject(DOCUMENT) private _document,
               private cartLocalstorageService : CartLocalstorageService,
               private cartCheckoutService: CartCheckoutService,
               public snackBar: MatSnackBar,
               public router: Router, private _eventEmiter: EventEmiterService) {


  }

  private abrirModal(articulo: ArticleModel ):void{
    this.imageUrls = [];
    this.articuloSingle = articulo;
    /*
    carga imagenes a slider modal
    */
    if(!isNullOrUndefined(articulo.listPhoto) && articulo.listPhoto.length>0){
      // let  listImages: ArticlePhotoModel[] = articulo.listPhoto;
      for ( let listImage of articulo.listPhoto){
        this.imageUrls.push(listImage.urlphoto);
      }
    }

    for ( let articuloImportacion of  this.listadoImportacion){
      if(articulo.codeImport === articuloImportacion.codeImport){
        this.listadoMateriales = articuloImportacion.listMaterial;
        this.listadoColorMaterial = this.getColorMaterial(articuloImportacion.listArticle, articulo.codeMaterial);
      }
    }
  }

  private seleccionColor(codeColor:number):void{
    if (isDevMode())console.log("INGRESA--------->",codeColor);
  }



  /**
   * AGREGAR ARTICULOS A LA CESTA
   */
  private agregarCesta(articulo: ArticleModel ):void{
    this.listCartArticle = [];
    this.setEstilos(true);
      let test = this.cartLocalstorageService.guardarLocalStorage( {code: btoa(articulo.code.toString()), url:btoa(articulo.urlFoto) } );
      if(test){
        this.snackBar.open("Nuevo reloj Agregado", 'X', {
          duration: 2000,
        });
      }
      this.setListCartArticle();
      this.setSubtotales();

  }

  /**
   * recive un booleano para aplicar o quitar este estilo
   * @param aplicarEstilo
   */
  private setEstilos(aplicarEstilo:boolean):void{
    let shoppingCart:any = document.getElementsByClassName('shopping__cart');
    let bodyOverlay:any = document.getElementsByClassName('body__overlay');

    if( aplicarEstilo ){
      console.log("-----------si ");
      shoppingCart[0].classList.add('shopping__cart__on');
      bodyOverlay[0].classList.add('is-visible');
    }else{
      shoppingCart[0].classList.remove('shopping__cart__on');
      bodyOverlay[0].classList.remove('is-visible');
    }
  }

  private irCheckout():void{
    this.setEstilos(false);
    this.router.navigate(['checkout']);
  }

  private eliminarDeCesta(articulo: ArticleModel):void{
    this.cartCheckoutService.eliminarDeCesta(articulo);
    this.setListCartArticle();
    this.setSubtotales();
  }
  private getMaterialModel(listArticulos:ArticleModel[]):MaterialModel[]{
    let retornoListMateriales:MaterialModel[] = [];
    for( let articulo of listArticulos){
      let verifica:boolean=false;
      for(let material of retornoListMateriales){
        if (material.codeMaterial === articulo.codeMaterial){
          verifica = true;
          break;
        }
      }
      if(!verifica){
        retornoListMateriales.push({ codeMaterial :articulo.codeMaterial,nameMaterial: articulo.nameMaterial, urlIconMateria: articulo.urlIconMaterial });
      }

    }
    return retornoListMateriales;
  }

  private getColorMaterial(listArticulos:ArticleModel[], codeMaterial?:number):ColorMaterialModel[]{
    let retornoListColorMaterial:ColorMaterialModel[] = [];
    for(let articulo of  listArticulos){
      if(codeMaterial === articulo.codeMaterial){
        let verifica:boolean=false;
        for(let color of retornoListColorMaterial){
          if( color.codeColor === articulo.codeColor){
            verifica = true;
            break;
          }
        }
        if(!verifica){
          retornoListColorMaterial.push({ codeColor:articulo.codeColor,
            colorHexadecimal:articulo.colorHexadecimal,
            color:articulo.color
          });
        }
      }

    }

    return retornoListColorMaterial;
  }
  private getArticulo_material(codigoImportacion:string):ArticleImportCodeModel{
    let retornoListArticulos:ArticleModel[] = [];
    let retornoListMateriales:MaterialModel[] = [];
    // let retornoListColorMaterial:ColorMaterialModel[] = [];
    for(let articulo of  this.articulos){
      if(codigoImportacion === articulo.codeImport){
          let registroArticulos:ArticleModel = articulo;
          retornoListArticulos.push(registroArticulos);
      }

    }
    retornoListMateriales =  this.getMaterialModel(retornoListArticulos);
    // retornoListColorMaterial = this.getColorMaterial(retornoListArticulos);
    return {codeImport:codigoImportacion,listArticle:retornoListArticulos, listMaterial: retornoListMateriales};
  }
  ngOnInit() {

      this.articleService.cargarArticulos().subscribe( (articulos:ArticleModel[]) =>{
          this.articulos = articulos;
          this.fakeArticle = false;
          console.log("INICA");
        for( let articulo of this.articulos){
            let verifica:boolean=false;
            for (let articuloImportacion of this.listadoImportacion) {
              if(articuloImportacion.codeImport === articulo.codeImport){
                verifica = true;
                break;
              }
            }
            if(!verifica){
              this.listadoImportacion.push(this.getArticulo_material(articulo.codeImport));
            }
        }
          console.log(this.listadoImportacion);
      });


}

  private setListCartArticle(){
    this.listCartArticle = this.cartCheckoutService.getDatosLocalStorage(this.articulos);
    this._eventEmiter.sendMessage("hola desde shop"+this.listCartArticle.length);
  }
  private getListCartArticle():ArticleModel[]{
    return this.listCartArticle;
  }
  private setSubtotales(){
    let subtotales:any = this.cartCheckoutService.getSubTotal(this.listCartArticle);
    this.subTotal = subtotales.subtotalPromo;
    this.subTotalSinPromo = subtotales.subtotal;
  }

}
