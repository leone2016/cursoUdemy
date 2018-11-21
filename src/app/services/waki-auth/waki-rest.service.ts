import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {WakiAuthService} from './waki-auth.service';
import {Observable, throwError} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {bunble} from '../../../environments/bundle';
import {environment} from '../../../environments/environment';
import {LoginResponseModel} from '../../models/login-response.model';
import {map, retry, retryWhen, mergeMap, concatMap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WakiRestService {
  constructor(private httpClient: HttpClient, private wakiAuthService: WakiAuthService) {
    console.log("2");
    // if (!this.wakiAuthService.isAuthenticaded()) { //false cuando si tiene valores en localStorage
    //   this.wakiAuthService.setToken();
    //   if(isDevMode())
    //     console.log("Si tiene clave");
    // }else{
    //
    //
    // }
  }
  public  converterObjectToArray( object ) {
    return Object.keys( object )
      .map( function ( key ) {
        return object[ key ];
      } );
  }
  public request<T>(urlParams?:string,httpMethod?:string):Observable<T>{
    try{
      if(isNullOrUndefined(urlParams) || urlParams===''){
        throwError(bunble.messageErrorRestUrl)
      }

      const userTokenObservable:  Observable<any> = this.wakiAuthService.requestToken();
      let request:Observable<any>;

      request = userTokenObservable.pipe( concatMap( (userTokenResponse:string)=>{
                console.log("----------------------------------1");
               return this.requestLoginApp<T>(urlParams,httpMethod);
        }),catchError((error)=>{
          console.log("----------------------------------2");

          console.log(error);
        }),
        retryWhen( (retryError)=>{
          console.log("----------------------------------3");

          return retryError.pipe(mergeMap( (surceError)=>{
            return this.isServiceAuthenticationFailed( sourceError ) === true? this.wakiAuthService.requestToken(true) : console.log('ERROR EN REQUEST<T>');
          } ))
        });
      );

      // return this.requestLoginApp<T>(urlParams,httpMethod);

      return request;

    }catch(error){}
  }

  private requestLoginApp<T>(urlParams:string ,httpMethod?:string):Observable<T>{
    if(isDevMode())
    console.log("consulta articulos+----------+++++");
    try {
      const loginServiceUrl:string = urlParams;
      let header: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
      // const header: HttpHeaders = this.getRequestHeaders();
      if( httpMethod === 'POST'){
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
      this.log( error );
      return true;
    }
  }

  public getRequestHeaders():HttpHeaders{
    let headers: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
    const authHeader: {key: string, value:string} = this.getBasicAuthHeader();
    headers = headers.append(authHeader.key, authHeader.value)
    return headers;
  }
  private getBasicAuthHeader():{key:string, value:string}{
    console.log("MANDA TOKEN ;-) "+this.wakiAuthService.requestToken2());
    return {key:'Authorization', value: 'BASIC '+this.wakiAuthService.requestToken2()};
  }
  public getEncodeDataForrequest():string{
    try {
      return btoa( environment.waki_rest_service_configuration.authApp.user+":"+environment.waki_rest_service_configuration.authApp.password);
    }catch(error){
      return null;
    }
  }

}







