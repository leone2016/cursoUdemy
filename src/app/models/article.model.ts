import {StockModel} from './stock.model';
import {ArticlePhotoModel} from './article-photo.model';

export interface ArticleModel {
  code:number;
  codeImport:string;
  nameProduct:string;
  smallDescription:string;
  longDescription:string;
  codeColor:number;
  colorHexadecimal:string;
  color:string;
  gender:string;
  type:string;
  urlFoto:string;
  Promo:string;
  rate:number;
  ratePromo:number;
  category:string;
  codeMaterial:number;
  nameMaterial:string;
  urlIconMaterial:string;
  listStock:StockModel[];
  listPhoto: ArticlePhotoModel[];
}
