import { Injectable } from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../../environments/environment';

@Injectable()
export class RememberMeService {

  public constructor(private localStorageService: LocalStorageService) { }

  public rememberMe(userName: string):boolean{
      if( this.localStorageService.isSupported !== true ){
        return false;
      }
      const localStorageKey: string = this.getLocalStorageKey();
      return this.localStorageService.set(localStorageKey, userName);
  }
  public isRememberMe():boolean{
    return this.localStorageService.isSupported && this.getUserName() !== null && this.getUserName()!== undefined;
  }

  public forgetMe(userName: string){
    if( this.isRememberMe() && this.getUserName() === userName){
      this.localStorageService.remove(this.getLocalStorageKey());
    }
  }
  private getLocalStorageKey():string{
    return environment.waki_rest_service_configuration.authUser.localStorageKey;
  }
  public getUserName():string{
    return this.localStorageService.get<string>(this.getLocalStorageKey());
  }

}
