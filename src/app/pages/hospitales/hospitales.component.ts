import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public desde: number = 0;
  public totalRegistros: number = 0;
  public HOSPITALES_POR_PAGINA: number = 5;
  public cargando: boolean = true;

  constructor(public hospitalesService: HospitalesService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe((respuesta: any) => {
      // Carga de tabla de usuarios
      this.cargarHospitales();
    });
  }


  public crearHospital() {
    Swal.fire({
      title: 'Añadir hospital',
      text: 'Escriba el nombre del hospital',
      input: 'text',
      showCancelButton: true
    }).then((result) => {
      if (result.value && result.value.length !== 0) {
        this.hospitalesService.crearHospital(new Hospital(result.value)).subscribe(respuesta => this.cargarHospitales());
      } else {
        this.alertaHospitalVacio();
      }
    });
  }



  public alertaHospitalVacio() {
    Swal.fire(
      'Debe ingresar un nombre',
      'No se acepta un hospital con nombre vació',
      'error'
    );
  }

  public mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  public cargarHospitales() {
    this.cargando = true;
    this.hospitalesService.cargarHospitales(this.desde).subscribe((respuesta: any) => {
      this.totalRegistros = respuesta.total;
      this.hospitales = respuesta.hospitales;
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
    // Carga de tabla de hospitales
    this.cargarHospitales();
  }


  public buscarHospital(termino: string) {
    // Si el termino es vacío, no accede a la búsqueda
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hospitalesService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });

  }


  public borrarHospital(hospital: Hospital) {
    // Notificación exitosa
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta a punto de eliminar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Bórrelo!'
    }).then((result) => {
      if (result.value) {
        this.hospitalesService.borrarHospital(hospital._id).subscribe(respuesta => {
          // Actualizar registros actuales
          this.totalRegistros--;

          // La cantidad de saltos que debe dar para volver a la primera página
          const saltos = Math.floor(this.totalRegistros / this.HOSPITALES_POR_PAGINA);

          // Si son iguales está en una página vacía, se vuelve a la anterior
          if (this.desde === this.totalRegistros && saltos !== 0) {
            this.desde -= 5 * saltos;
          }
          // Carga de tabla de hospitales
          this.cargarHospitales();
        });
      }
    });
  }


  public guardarhospital(hospital: Hospital) {
    if (hospital.nombre === '') {
      this.alertaHospitalVacio();
      this.cargarHospitales();
      return;
    }

    this.hospitalesService.actualizarHospital(hospital).subscribe();
  }


}
