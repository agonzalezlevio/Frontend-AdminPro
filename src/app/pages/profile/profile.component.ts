import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemporal: any;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }


  public seleccionImagen(archivo: any) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    // Verficación minima si se trata de una imagen
    if (archivo.type.indexOf('image') < 0 ) {
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
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

  public guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe();

  }


}
