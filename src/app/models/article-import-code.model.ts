import {ArticleModel} from './article.model';
import {MaterialModel} from './material.model';
import {ColorMaterialModel} from './color-material.model';

export interface ArticleImportCodeModel {
  codeImport?:string;
  listArticle?: ArticleModel[];
  listMaterial?: MaterialModel[];
  listColor?: ColorMaterialModel[];
}
