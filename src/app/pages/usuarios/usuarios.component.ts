import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public totalRegistros: number = 0;
  public USUARIOS_POR_PAGINA: number = 5;

  public cargando: boolean = true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe((respuesta: any) => {

      // Si el usuario actual cambia su propia imagen, se actualiza el storage
      if (respuesta.usuario._id === this.usuarioService.usuario._id) {
        this.usuarioService.actualizarStorage(respuesta.usuario._id , respuesta.usuario.img);
      }
      // Carga de tabla de usuarios
      this.cargarUsuarios();
    });
  }


  public mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  public cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((respuesta: any) => {
      this.totalRegistros = respuesta.total;
      this.usuarios = respuesta.usuarios;
      this.cargando = false;
    });
  }


  public cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    // Verificaciones para que la paginación no alcance números negativos
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    // Incremento o disminución de la paginación
    this.desde += valor;
    // Carga de tabla de usuarios
    this.cargarUsuarios();
  }


  public buscarUsuario(termino: string) {
    // Si el termino es vacío, no accede a la búsqueda
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });

  }


  public borrarUsuario(usuario: Usuario) {

    // El usuario no puede eliminarse a si mismo
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire({
        title: 'No se puede borrar usuario',
        text: 'No se puede borrar a si mismo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Notificación exitosa
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de eliminar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Bórrelo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuarios(usuario._id).subscribe(respuesta => {
          // Actualizar registros actuales
          this.totalRegistros--;

          // La cantidad de saltos que debe dar para volver a la primera página
          const saltos = Math.floor(this.totalRegistros / this.USUARIOS_POR_PAGINA);

          // Si son iguales está en una página vacía, se vuelve a la anterior
          if (this.desde === this.totalRegistros && saltos !== 0 ) {
            this.desde -= 5 * saltos;
          }
          // Carga de tabla de usuarios
          this.cargarUsuarios();
        });
      }
    });
  }


  public guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
