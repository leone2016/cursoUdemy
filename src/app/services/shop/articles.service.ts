import {Injectable, isDevMode} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {isNullOrUndefined} from 'util';
import {LoginResponseModel} from '../../models/login-response.model';
import {LoginRequestModel} from '../../models/login-request.model';
import {Observable, throwError} from 'rxjs/index';
import { of } from 'rxjs';
// import {throwError} from 'rxjs/index';
import { map } from "rxjs/operators";
import {WakiRestService} from '../waki-auth/waki-rest.service';
import {WakiAuthService} from '../waki-auth/waki-auth.service';
import {ArticleModel} from '../../models/article.model';
// import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {



  constructor( private wakiRestService:WakiRestService) {

  }

  public cargarArticulos():Observable<ArticleModel[]>{
    let url:string = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.articleModule.path;
    return this.wakiRestService.request<ArticleModel[]>(url);
  }





}
