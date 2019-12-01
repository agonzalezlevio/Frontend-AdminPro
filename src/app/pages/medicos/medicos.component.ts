import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicoService } from '../../services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public desde: number = 0;
  public totalRegistros: number = 0;
  public MEDICOS_POR_PAGINA: number = 5;
  public cargando: boolean = true;


  constructor(public modalUploadService: ModalUploadService, public medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }


  public buscarMedico(termino: string) {
      // Si el termino es vacío, no accede a la búsqueda
      if (termino.length <= 0) {
        this.cargarMedicos();
        return;
      }

      this.cargando = true;

      this.medicoService.buscarMedico(termino).subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
      });
  }


  public crearMedico() {

  }


  public mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('medicos', id);
    this.cargarMedicos();
  }


  /* public guardarMedico(medico: Medico) {

  } */

  public borrarMedico(medico: Medico) {
    // Notificación exitosa
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de eliminar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Bórrelo!'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id).subscribe(respuesta => {
          // Actualizar registros actuales
          this.totalRegistros--;

          // La cantidad de saltos que debe dar para volver a la primera página
          const saltos = Math.floor(this.totalRegistros / this.MEDICOS_POR_PAGINA);

          // Si son iguales está en una página vacía, se vuelve a la anterior
          if (this.desde === this.totalRegistros && saltos !== 0) {
            this.desde -= 5 * saltos;
          }
          // Carga de tabla de hospitales
          this.cargarMedicos();
        });
      }
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
    // Carga de tabla de médicos
    this.cargarMedicos();
  }


  public cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde).subscribe((respuesta: any) => {
      this.totalRegistros = respuesta.total;
      this.medicos = respuesta.medicos;
      this.cargando = false;
    });
  }
}
