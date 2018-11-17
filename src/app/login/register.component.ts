import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert';
import {UsuarioService} from '../services/service.index';
import {Usuario} from '../models/usuario.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService) { }

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
        this.forma.value.nombres,
        this.forma.value.mail,
        this.forma.value.contrasenia
      );
      // this._usuarioService.crearUsuario(usuario).subscribe(resp=> { console.log(resp); });



  }

  ngOnInit() {
    this.forma =new FormGroup ({
      nombres: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      contrasenia: new FormControl(null, Validators.required ),
      contrasenia2: new FormControl(null, Validators.required )
    }, { validators: this.iguales( 'contrasenia', 'contrasenia2' )} )
  }

}
