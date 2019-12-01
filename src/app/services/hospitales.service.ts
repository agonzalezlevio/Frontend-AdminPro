import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {




  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}




  public cargarHospitales(desde: number = 0) {
    const URL = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(URL);
  }

  public obtenerHospital( id: string ){
    const URL = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(URL);
  }

  public borrarHospital( id: string ) {
    let URL = URL_SERVICIOS + '/hospital/' + id;
    URL += `?token=${this.usuarioService.token}`;

    return this.http.delete(URL).pipe(map((respuesta: any) => {
      Swal.fire(
        '¡Borrado!',
        `El hospital ${respuesta.hospital.nombre} ha sido eliminado.`,
        'success'
      );
      return true;

    }));
  }


  public crearHospital( hospital: Hospital ) {
    let URL = URL_SERVICIOS + '/hospital';
    URL += `?token=${this.usuarioService.token}`;

    return this.http.post(URL, hospital).pipe(map((respuesta: any) => {
      Swal.fire({
        title: 'Hospital creado',
        text: respuesta.hospital.nombre,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return respuesta.hospital;
    }));

  }

  public buscarHospital( termino: string ){
    const URL = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(URL).pipe(map((respuesta: any) => respuesta.hospitales));

  }

  public actualizarHospital( hospital: Hospital ) {
    let URL = URL_SERVICIOS + '/hospital/' + hospital._id;
    URL += `?token=${this.usuarioService.token}`;

    return this.http.put(URL, hospital).pipe(map( (respuesta: any) => {

      // Notificación cambio exitoso
      Swal.fire({
        title: 'Hospital actualizado',
        text: respuesta.hospital.nombre,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });


      return true;
    }));

  }

}
