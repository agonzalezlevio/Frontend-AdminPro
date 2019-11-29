import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    const URL = URL_SERVICIOS + '/img/';

    let URL_IMAGEN: string;

    if (!img) {
      URL_IMAGEN = URL + '/usuarios/noimage';
    }
    if (img.indexOf('https') >= 0) {
      URL_IMAGEN = img;
    }
    switch (tipo) {
      case 'usuarios':
        URL_IMAGEN = URL + 'usuarios/' + img;
        break;
      case 'medicos':
        URL_IMAGEN = URL + 'medicos/' + img;
        break;
      case 'hospitales':
        URL_IMAGEN = URL + 'hospitales/' + img;
        break;
      default:
        URL_IMAGEN = URL + 'usuarios/noimage';
        // console.log('El Tipo de imagen no existe', img);
        break;
    }
    return URL_IMAGEN;
  }

}
