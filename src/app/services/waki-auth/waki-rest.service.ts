import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WakiAuthService} from './waki-auth.service';
import {Observable, throwError} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {bunble} from '../../../environments/bundle';
import {environment} from '../../../environments/environment';
import {LoginResponseModel} from '../../models/login-response.model';


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
  public request<T>(urlParams?:string, httpOptions?: {headers?:HttpHeaders},body?:any):Observable<T>{
    try{

      if(isNullOrUndefined(urlParams) || urlParams===''){
        throwError(bunble.messageErrorRestUrl)
      }
      // const userTokenObservable  = this.wakiAuthService.requestToken(false).subscribe((resp:string )=>{
      //       //   // console.log(resp);
      //         console.log("INICAAAAAAAAAAAAAAAAAAA");C
      //         console.log("TESTTTTT");
              return this.requestLoginApp<T>(urlParams);
            // });


    }catch(error){}
  }

  private requestLoginApp<T>(url:string):Observable<T>{
    if(isDevMode())
    console.log("INGRA GET");
    try {
      const loginServiceUrl:string = url;
      console.log(loginServiceUrl);
      const header: HttpHeaders = this.getRequestHeaders();
      return this.httpClient.get<T>(loginServiceUrl, {headers: header } );
    }catch(error){
      if(isDevMode())
      console.error("ERROR -----> "+error);
    }

  }
  private getRequestHeaders():HttpHeaders{
    let headers: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
    const authHeader: {key: string, value:string} = this.getBasicAuthHeader();
    headers = headers.append(authHeader.key, authHeader.value)
    return headers;
  }
  private getBasicAuthHeader():{key:string, value:string}{
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







