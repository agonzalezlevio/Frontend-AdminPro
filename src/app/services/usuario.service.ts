import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {   }

  public login(usuario: Usuario, recordarme: boolean = false) {
    const URL = URL_SERVICIOS + '/login';

    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL, usuario).pipe(map( (respuesta: any) =>{

          localStorage.setItem('id', respuesta.id);
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));

          return true;

    }));
  }

  public crearUsuario(usuario: Usuario) {

    const URL = URL_SERVICIOS + '/usuario';
    return this.http.post(URL, usuario).pipe(map((respuesta: any) => {
      swal('Usuario creado', respuesta.usuario.email,  'success');
      return respuesta.usuario;
    }));
  }
}
