import {Injectable, isDevMode} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {
    if(isDevMode())
      console.log("Servicio listo para ser utilizado");
  }

  // crearUsuario (usuario: Usuario ){
  //         let url = environment.waki_rest_service_configuration;
  //         return this.http.post(url, usuario );
  // }
}
