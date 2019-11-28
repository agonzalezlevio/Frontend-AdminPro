import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/internal/operators/map';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;

  constructor(public http: HttpClient, public router: Router) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  public loginGoogle(token: string) {
    const URL = URL_SERVICIOS + '/login/google';

    return this.http.post(URL, { token }).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);

      return true;
    }));
  }

  public estaLogeado() {
      return ( this.token.length > 5);
  }

  public cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }


  public guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));


    this.usuario = usuario;
    this.token = token;

  }


  public logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
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
