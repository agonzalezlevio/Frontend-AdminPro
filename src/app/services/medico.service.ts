import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  public cargarMedicos(desde: number) {
    const URL = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(URL);
  }

  public cargarMedico(id: string) {
    const URL = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(URL).pipe(map((respuesta: any) => respuesta.medico));
  }


  public buscarMedico(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(URL).pipe(map((respuesta: any) => respuesta.medicos));

  }


  public borrarMedico(id: string) {
    let URL = URL_SERVICIOS + '/medico/' + id;
    URL += '?token=' + this.usuarioService.token;

    return this.http.delete(URL).pipe(map((respuesta: any) => {
      Swal.fire(
        '¡Borrado!',
        `El Médico ${respuesta.medico.nombre} ha sido eliminado.`,
        'success'
      );
      return true;
    }));
  }


  public guardarMedico(medico: Medico) {
    let URL = URL_SERVICIOS + '/medico';
    // Si existe un médico se verifica con la existencia de la ID
    if (medico._id) {
      // actualizando un médico
      URL += '/' + medico._id;
      URL += '?token=' + this.usuarioService.token;
      return this.http.put(URL, medico).pipe(map((respuesta: any) => {
        Swal.fire({
          title: 'Médico actualizado',
          text: respuesta.medico.nombre,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        return respuesta.medico;
      }));
    } else {
      // Creando un médico
      URL += '?token=' + this.usuarioService.token;
      return this.http.post(URL, medico).pipe(map((respuesta: any) => {
        Swal.fire({
          title: 'Médico creado',
          text: respuesta.medico.nombre,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        return respuesta.medico;
      }));
    }
  }

}
