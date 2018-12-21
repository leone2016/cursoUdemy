  import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert';
import {UsuarioService} from '../services/service.index';
import {Usuario} from '../models/usuario.model';
import {MensajeModel} from '../models/model.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  private loading:boolean = false;
  constructor(public _usuarioService: UsuarioService, private router:Router ) { }

  iguales( campo1: string,  campo2:string){
    return ( group : FormGroup ) =>{
            let pass1 = group.controls[campo1].value;
            let pass2 = group.controls[campo2].value;
           if (isDevMode())
              console.log(pass1,pass2 );

            if( pass1 === pass2 ){
                  return null;
            }
            return {
              iguales: true
             };
      };
  }

  crearCuenta(){

    if( this.forma.invalid ){
      swal('importate', 'verifique que todos los campos esten correctamente ingresados', 'warning');
      return;
    }
      if (isDevMode()){
        console.log(this.forma.valid);
        console.log(this.forma.value);
      }

      let usuario = new Usuario(
        this.forma.value.name,
        this.forma.value.email,
        this.forma.value.password
      );

      console.log(usuario);
      this.loading = true;
      this._usuarioService.crearUsuario(usuario).subscribe((resp:MensajeModel)=> {
        swal(resp.message, '', 'success');
        this.loading = false;

      }, (error)=>{
        // console.log(error.error.message);
        swal(' ', error.error.message, 'warning');
        this.loading = false;
      });




  }

  ngOnInit() {
    this.forma =new FormGroup ({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required ),
      password2: new FormControl(null, Validators.required )
    }, { validators: this.iguales( 'password', 'password2' )} )
  }

}
