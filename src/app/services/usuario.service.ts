import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient) { }


  public guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));


    this.usuario = usuario;
    this.token = token;

  }


  public login(usuario: Usuario, recordarme: boolean = false) {
    const URL = URL_SERVICIOS + '/login';

    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(URL, usuario).pipe(map((respuesta: any) => {

      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);

      return true;

    }));
  }

  public crearUsuario(usuario: Usuario) {

    const URL = URL_SERVICIOS + '/usuario';
    return this.http.post(URL, usuario).pipe(map((respuesta: any) => {
      Swal.fire({
        title: 'Usuario creado',
        text: respuesta.usuario.email,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return respuesta.usuario;
    }));
  }
}
