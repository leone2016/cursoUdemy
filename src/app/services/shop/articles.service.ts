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
import { mergeMap } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {




  constructor( private wakiRestService:WakiRestService) {
    console.log('TEST-----------------------------------');
    const myexample = of('Hello');
    const example = myexample.pipe( map( test:any)=>{
      console.log(test);
    });
    //aqui quisiera que salga output: Hello WORD
    // const subscribe = example.subscribe(val => console.log(val));



//     //emit 'Hello'
//     const source = of('Hello');
// //mergeMap also emits result of promise
//     const myPromise = val =>
//       new Promise(resolve => resolve(`${val} World From Promise!`));
//
//
//     const example = source.pipe(
//       mergeMap(
//         val => myPromise(val),
//         (valueFromSource, valueFromPromise) => {
//           return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
//         }
//       )
//     );
//     //output: "Source: Hello, Promise: Hello World From Promise!"
//     const subscribe = example.subscribe(val => console.log(val));
    console.log('TEST-----------------------------------');
  }

  public cargarArticulos():Observable<ArticleModel[]>{
    // let headers: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
    let url:string = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.articleModule.path;
    return this.wakiRestService.request<ArticleModel[]>(url,'GET');
  }





}
