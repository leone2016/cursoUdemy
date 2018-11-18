import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import {WakiRestService} from '../waki-auth/waki-rest.service';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor( private wakiRestService:WakiRestService ) { }

  public getProvincias( ){
    let url:string = 'provincia.json';
    return this.wakiRestService.request<any[]>(url);
  }
  public getCantones( ){
    let url:string = 'canton.json';
    return this.wakiRestService.request<any[]>(url);
  }
  public getParroquia( ){
    let url:string = 'canton.json';
    return this.wakiRestService.request<any[]>(url);
  }

}
