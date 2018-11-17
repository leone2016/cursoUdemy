import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import {Observable} from 'rxjs';
import {LoginRequestModel} from '../../models/login-request.model';
import {LoginResponseModel} from '../../models/login-response.model';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private localStorage:LocalStorageService) { }

  public login(loginRequest:LoginRequestModel):Observable<boolean>{
      return this.requestLoginToServer(loginRequest).pipe(map((loginResponse: LoginResponseModel) =>{
        if(loginResponse && loginResponse.status && loginResponse.status === true){
          return this.saveToLocalStorage(loginResponse);
        }
        return false;
      }));
  }


  private requestLoginToServer(loginRequest: LoginRequestModel ):Observable<LoginResponseModel>{
      const loginServiceUrl: string = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.authUser.path;
      const headers: HttpHeaders = this.getRequestHeaders(loginRequest);
      return this.httpClient.post<LoginResponseModel>(loginServiceUrl, null, { headers: headers });

  }
  public saveToLocalStorage(loginResponse: LoginResponseModel):boolean{
    const localStorageKey : string = this.getLocalStorageKey();
    return this.localStorage.isSupported && this.localStorage.set(localStorageKey, loginResponse);
  }

  private getLocalStorageKey():string{
      return environment.waki_rest_service_configuration.authUser.localStorageKey
  }
  private getRequestHeaders(loginRequest:LoginRequestModel):HttpHeaders{
      let headers: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});
      const authHeader: {key: string, value:string } = this.getBasicAuthHeader(loginRequest);
      headers = headers.append(authHeader.key, authHeader.value);
      return headers;
  }
  public getBasicAuthHeader(loginRequest:LoginRequestModel):{key:string, value:string}{
        return { key: 'Authorization', value: 'Basic '+this.getEncodeDataForrequest(loginRequest)};
  }
  public getEncodeDataForrequest(loginRequest:LoginRequestModel):string{
    try {
      return btoa( loginRequest.username+':'+loginRequest.password);
    }catch(error){
      return null;
    }
  }


}
