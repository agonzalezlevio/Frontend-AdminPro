import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    const URL = URL_SERVICIOS + '/img';

    if (!img) {
      return URL + '/usuarios/noimage';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuarios':
        return URL + '/usuarios/' + img;
      case 'medicos':
        return URL + '/usuarios/' + img;
      case 'hospitales':
        return URL + '/hospitales/' + img;
      default:
        console.log('El Tipo de imagen no existe');
        return URL + 'usuarios/noimage';
    }
  }

}
