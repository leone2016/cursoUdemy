import {Injectable, isDevMode} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ArticleModel} from '../../models/article.model';
import {WakiRestService} from '../waki-auth/waki-rest.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient, private wakiRestService:WakiRestService) {
    if(isDevMode())
      console.log("Servicio listo para ser utilizado");
  }

  crearUsuario (usuario: Usuario ){
    console.log("LLEGA");
    console.log(usuario);
    let url:string = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.newUser.path;
    return this.wakiRestService.request<ArticleModel[]>(url,'POST', usuario);
  }
}
