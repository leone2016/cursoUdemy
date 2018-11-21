import {Injectable, isDevMode} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {isNullOrUndefined} from 'util';
import {LoginResponseModel} from '../../models/login-response.model';
import {LoginRequestModel} from '../../models/login-request.model';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {Observable, throwError} from 'rxjs/index';
import { of } from 'rxjs';

import { map, concatMap } from "rxjs/operators";
// import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class WakiAuthService {

  private token:string = "";
  constructor(private localStorage: LocalStorageService, private httpClient: HttpClient) {

    if (!this.isAuthenticaded()) { //false cuando si tiene valores en localStorage
      this.setToken();
      if(isDevMode())
      console.log("Si tiene clave");
    }
  }

  private lg(texto:any){
    if(isDevMode())
      console.log(texto);
  }

  public requestToken2():string{

   return  this.getToken();
  }
  public requestToken(forceRequest?: boolean):Observable<string>{
    try{
      // SI ESTA REGISTRADO Y NO SE FUERZA A CARGAR UN NUEVO TOKEN
      if(isDevMode)
      console.log('---------------3.1');
      this.lg("Solicita token --->");
      if (!this.isAuthenticaded() && !forceRequest){
        return  of(this.getToken());
      }
      this.removeItem();
      let request: Observable<string>;
      const userTokenObservable  = this.requestLoginApp();
      request = userTokenObservable.pipe(map((loginResponse:LoginResponseModel)=>{
        if(isDevMode)
        console.log('----------------------3.3');
        this.setToken(loginResponse);
        return this.getToken();
      }));
      if(isDevMode)
      console.log('----------------------3.6');
      return request;
      // TALVEZ NO ESTA AUTHENTIFICADO TOKEN ó SE FUERZA A UN NUEVO TOKEN

    }catch(error){ return throwError( error );}

  }
  private isRequestAuthenticationSuccess( authResponse: any ): boolean {
    try {
      return !isNullOrUndefined( authResponse ) && authResponse.status === true && authResponse.token !== '';
    } catch ( error ) {
      // this.log(error);
      return false;
    }
  }
  private isAuthenticaded():boolean{
    try{
      return isNullOrUndefined(this.getUserName());
    }catch(error){}
  }

  public removeItem():boolean {
    return this.localStorage.remove(this.getLocalStorageKey());
  }

  public getUserName():string{
    return this.localStorage.get<string>(this.getLocalStorageKey());
  }


  public saveToLocalStorage(loginResponse: LoginResponseModel):boolean{
    const localStorageKey : string = environment.waki_rest_service_configuration.authApp.localStorageKey;
    return this.localStorage.isSupported && this.localStorage.set(localStorageKey, loginResponse);
  }
  private converterObjectToArray( object ) {
    return Object.keys( object )
      .map( function ( key ) {
        return object[ key ];
      } );
  }
  private requestLoginApp():Observable<LoginResponseModel>{
    if(isDevMode){
      this.lg("CONSULTA token");
    console.log('---------------3.2');
    }
    try {
      const loginServiceUrl:string = environment.waki_rest_service_configuration.api_url +  environment.waki_rest_service_configuration.authApp.path
      const header: HttpHeaders = this.getRequestHeaders();
      return this.httpClient.post<LoginResponseModel>(loginServiceUrl, null, {headers: header } );
    }catch(error){ this.lg(error); }

  }

  private getRequestHeaders():HttpHeaders{
    let headers: HttpHeaders = new HttpHeaders({'content-type': 'aplication/json' });
    const authHeader: {key: string, value:string} = this.getBasicAuthHeader();
    headers = headers.append(authHeader.key, authHeader.value)
    return headers;
  }
  private getBasicAuthHeader():{key:string, value:string}{
    return {key:'Authorization', value: 'Basic '+this.getEncodeDataForrequest()};
  }
  private getLocalStorageKey():string{
    return environment.waki_rest_service_configuration.authApp.localStorageKey;
  }
  public getEncodeDataForrequest():string{
    try {
      return btoa( environment.waki_rest_service_configuration.authApp.user+":"+environment.waki_rest_service_configuration.authApp.password);
    }catch(error){
      return null;
    }
  }
  private setToken(response?:LoginResponseModel ){
    if(isDevMode)
    console.log('----------------------3.4');
    if( isNullOrUndefined(response) ){
      this.token = this.converterObjectToArray(this.getUserName())[0];
    }else{
      this.lg("GUARDA TOKEN ")
      this.saveToLocalStorage(response);
      this.token = response.token;
      this.lg(this.token);
    }
  }
  private getToken():string{
    if(isDevMode)
    console.log('----------------------3.5');
    return  this.token;
  }
}
