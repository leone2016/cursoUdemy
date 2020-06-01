import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {WakiAuthService} from './waki-auth.service';
import {Observable, throwError} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {bunble} from '../../../environments/bundle';
import {environment} from '../../../environments/environment';
import {LoginResponseModel} from '../../models/login-response.model';
import { mergeMap, concat, concatMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WakiRestService {
  constructor(private httpClient: HttpClient, private wakiAuthService: WakiAuthService) { }
  public  converterObjectToArray( object ) {
    return Object.keys( object )
      .map( function ( key ) {
        return object[ key ];
      } );
  }
  public request<T>(urlParams?:string,httpMethod?:string, body?: any):Observable<T>{
    try{
       if(isDevMode)
       console.log('---------------3');
      if(isNullOrUndefined(urlParams) || urlParams===''){
        throwError(bunble.messageErrorRestUrl)
      }
      let request: Observable<any>;
      const userTokenObservable  = this.wakiAuthService.requestToken(false);

      request = userTokenObservable.pipe(concatMap((resp:string )=>{
        if(isDevMode){
          console.log('---------------5');
          console.log(resp);
          console.log("INICAAAAAAAAAAAAAAAAAAA");
          console.log("TESTTTTT");
        }

        return this.makeHttpRequest<T>(urlParams,httpMethod,body);
     }));
     if(isDevMode)
     console.log('---------------7');
     return request;
    }catch(error){}
  }

  private makeHttpRequest<T>(urlParams:string ,httpMethod?:string, body?: any):Observable<T>{
    if(isDevMode){
      console.log('---------------6');
      console.log("INGRA GET");
    }
    try {
      const loginServiceUrl:string = urlParams;
      const header: HttpHeaders = this.getRequestHeaders();
      if( httpMethod === 'POST'){
        const requestBody: any = body || JSON.stringify('');
        return this.httpClient.post<T>( urlParams, requestBody, {headers: header } );
      }else if(httpMethod === 'GET'){
        return this.httpClient.get<T>(loginServiceUrl, {headers: header } );
      }
    }catch(error){
      if(isDevMode())
      console.error("ERROR -----> "+error);
    }

  }
  private isServiceAuthenticationFailed( failureResponse ): boolean {
    try {
      return (
        !isNullOrUndefined( failureResponse ) &&
        failureResponse instanceof HttpErrorResponse &&
        !isNullOrUndefined( failureResponse.error ) &&
        failureResponse.error.hasOwnProperty('status') &&
        failureResponse.error['status'] === false
      );
    } catch ( error ) {

      return true;
    }
  }

  private getRequestHeaders():HttpHeaders{
    let headers: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
    if (isDevMode())console.log(this.getBasicAuthHeader());
    const authHeader: {key: string, value:string} = this.getBasicAuthHeader();
    headers = headers.append(authHeader.key, authHeader.value)
    return headers;
  }
  private getBasicAuthHeader():{key:string, value:string}{
    return {key:'Authorization', value: 'Bearer '+this.wakiAuthService.requestToken2()};
  }
  public getEncodeDataForrequest():string{
    try {
      return btoa( environment.waki_rest_service_configuration.authApp.user+":"+environment.waki_rest_service_configuration.authApp.password);
    }catch(error){
      return null;
    }
  }

}







