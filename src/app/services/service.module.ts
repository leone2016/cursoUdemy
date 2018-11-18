import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  ArticlesService, CartCheckoutService,
  CartLocalstorageService,
  LoginService, ProvinciasService,
  RememberMeService,
  UsuarioService
} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {WakiAuthService} from './waki-auth/waki-auth.service';

@NgModule({
  imports:[
    CommonModule,
    HttpClientModule
  ],
  providers:[UsuarioService,
    RememberMeService,
    LoginService,
    ArticlesService,
    WakiAuthService,
    CartLocalstorageService,
    CartCheckoutService,
    ProvinciasService
  ],
  declarations:[]
})
export class ServiceModule{ }
