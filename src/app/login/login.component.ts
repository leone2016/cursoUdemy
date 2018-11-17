import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService, RememberMeService} from '../services/service.index';
import swal from 'sweetalert';
import {LoginRequestModel} from '../models/login-request.model';
import {bunble} from '../../environments/bundle';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private defaultUserName: string = null;
  private defaultRememberMe: boolean = false;
  private isRemeberedUser: boolean = false;

  constructor(private rememberMeService: RememberMeService, private loginService: LoginService) {
    this.initLoginForm();
  }


  private initLoginForm():void{
    this.setDefaultValues();
    try {
      this.loginForm = new FormGroup({
        'username': new FormControl( this.defaultUserName, [Validators.required] ),
        'password': new FormControl(null, Validators.required ),
        'rememberMe': new FormControl( this.defaultRememberMe )
      });
    }catch( error ){
      if(isDevMode()){
        console.log(bunble.messageErrorForm);
      }
    }

  }
  private login():void{
    console.log("INGRESO"+this.isLoginFormValid());
      if( this.isLoginFormValid()) {
            this.rememberMe();
            this.procedToLogin();
      } else{
            this.loginFormIsInvalid();
      }
  }
  private loginFormIsInvalid():void{
    swal('importate', bunble.messageFormIsInvalid , 'warning');
  }
  private rememberMeInLocalStorage( userName: string ):void{
        try{
          this.rememberMeService.rememberMe(userName);
        }catch(error){}
  }
  private procedToLogin():void{
      const loginRequestModel: LoginRequestModel = this.loginForm.value;
      this.loginService.login(loginRequestModel).subscribe( (loginStatus: any ) =>{
        console.log("---->"+loginStatus);
      })
  }

  private rememberMe():void{
    const loginRequestModel: LoginRequestModel = this.loginForm.value;
    if( loginRequestModel.rememberMe === true ){
      this.rememberMeInLocalStorage(loginRequestModel.username);
    }else{
      this.rememberMeService.forgetMe(loginRequestModel.username.trim());
    }
  }
  
  private isLoginFormValid():boolean{
    try{
      return this.loginForm.valid;
    }catch(error){
      return false
    }
  }

  private setDefaultValues():void {
    if( this.rememberMeService.isRememberMe() ){
      this.defaultRememberMe = true;
      this.defaultUserName = this.rememberMeService.getUserName();
      this.isRemeberedUser = true;
    }
  }
  ngOnInit() {
  }

}
