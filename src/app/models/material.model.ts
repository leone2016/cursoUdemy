import {ColorMaterialModel} from './color-material.model';
export interface MaterialModel{
  codeMaterial:number;
  nameMaterial:string;
  urlIconMateria:string;
  listColor?:ColorMaterialModel[];
}
