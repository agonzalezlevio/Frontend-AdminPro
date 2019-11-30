import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'hide';

  public notificacion = new EventEmitter<any>();


  constructor() { }

  public ocultarModal() {
    this.oculto = 'hide';
    this.tipo = null;
    this.id = null;
  }

  public mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
