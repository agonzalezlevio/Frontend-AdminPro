import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemporal: any;



  constructor(public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  public seleccionImagen(archivo: any) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    // Verificación mínima si se trata de una imagen
    if (archivo.type.indexOf('image') < 0) {
      // Notificación error en la imagen
      Swal.fire({
        title: 'Solo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });

      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal = reader.result;
  }


  public cambiarImagen() {

    const tipo = this.modalUploadService.tipo;
    const id = this.modalUploadService.id;

    this.subirArchivoService.subirArchivo(this.imagenSubir,tipo ,id ).subscribe(respuesta => {
      this.modalUploadService.notificacion.emit(respuesta);
      this.cerrarModal();
    });
  }


  public cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this.modalUploadService.ocultarModal();
  }

}
