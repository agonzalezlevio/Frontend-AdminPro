import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map  } from 'rxjs/internal/operators/map';
import { catchError  } from 'rxjs/internal/operators/catchError';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from './subir-archivo.service';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  public token: string;
  public menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    // Se carga el storage al iniciar el servicio
    this.cargarStorage();
  }

  public loginGoogle(token: string) {
    const URL = URL_SERVICIOS + '/login/google';

    return this.http.post(URL, { token }).pipe(map((respuesta: any) => {
      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);
      return true;
    }));
  }

  public estaLogeado() {
    return (this.token.length > 5);
  }

  public cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu')); /* */
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  public actualizarStorage(id: string, img: string) {
    // Actualizar información storage
    this.usuario.img = img;
    this.guardarStorage(id, this.token, this.usuario);
  }

  public guardarStorage(id: string, token: string, usuario: Usuario, menu?: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // Si el menu se añade como parámetro se inserta en el local storage y en el atributo del servicio
    if (menu) {
      localStorage.setItem('menu', JSON.stringify(menu));
      this.menu = menu;
    }
    this.usuario = usuario;
    this.token = token;
  }


  public logout() {
    this.usuario = null;
    this.menu = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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

    return this.http.post(URL, usuario).pipe(
      map((respuesta: any) => {

      this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);

      return true;

    }),
      catchError( respuestaError => {
        const respuesta = respuestaError.error;

        Swal.fire('Error al iniciar sesión', respuesta.mensaje, 'error');
        return throwError(respuestaError);
      })
    );
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
    }),
    catchError( respuestaError => {

      const respuesta = respuestaError.error;
      // Se hace un parse al mensaje para mostrar el error concreto
      let cutMessage = (respuesta.errors.message) as string;
      cutMessage = cutMessage.slice(cutMessage.lastIndexOf(':') + 1, cutMessage.length);

      Swal.fire( respuesta.mensaje, cutMessage, 'error');
      return throwError(respuestaError);
    })
    );
  }

  public actualizarUsuario(usuario: Usuario) {

    let URL = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    URL += `?token=${this.token}`;

    return this.http.put(URL, usuario).pipe(map((respuesta: any) => {

      // Si el usuario modificado es igual al que inicio sesión
      if (usuario._id === this.usuario._id) {
        // Actualizar información storage
        this.guardarStorage(respuesta._id, this.token, respuesta.usuario, this.menu);
      }

      // Notificación cambio exitoso
      Swal.fire({
        title: 'Usuario actualizado',
        text: respuesta.usuario.nombre,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });

      console.log(respuesta)

      return true;
    }),
    catchError( respuestaError => {

      const respuesta = respuestaError.error;
      // Se hace un parse al mensaje para mostrar el error concreto
      let cutMessage = (respuesta.errors.message) as string;
      cutMessage = cutMessage.slice(cutMessage.lastIndexOf(':') + 1, cutMessage.length);

      Swal.fire( respuesta.mensaje, cutMessage, 'error');
      return throwError(respuestaError);
    }));
  }




  public cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id).subscribe((respuesta: any) => {
      this.usuario.img = respuesta.usuario.img;

      // Actualizar información storage
      this.guardarStorage(id, this.token, this.usuario, this.menu);

      // Notificación cambio exitoso
      Swal.fire({
        title: 'Imagen Actualizada',
        text: respuesta.usuario.nombre,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    });
  }


  public cargarUsuarios(desde: number = 0) {
    const URL = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(URL);
  }


  public buscarUsuarios(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(URL).pipe(map((respuesta: any) => respuesta.usuarios));
  }


  public borrarUsuarios(id: string) {
    let URL = URL_SERVICIOS + '/usuario/' + id;
    URL += `?token=${this.token}`;

    return this.http.delete(URL).pipe(map((respuesta: any) => {

      Swal.fire(
        '¡Borrado!',
        `El usuario ${respuesta.usuario.nombre} ha sido eliminado.`,
        'success'
      );
      return true;

    }));
  }
}
