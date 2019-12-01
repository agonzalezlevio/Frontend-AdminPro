import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico.service';
import { HospitalesService } from '../../services/hospitales.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('', '', '', '', '') ;
  public hospital: Hospital = new Hospital('');


  constructor(
    public medicoService: MedicoService,
    public hospitalesService: HospitalesService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
    ) {

      activatedRoute.params.subscribe(params => {
        const id = params.id;

        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });

     }

  ngOnInit() {
    this.hospitalesService.cargarHospitales().subscribe((respuesta: any) => {
      this.hospitales = respuesta.hospitales;
    });
    // Recibir la información del modal
    this.modalUploadService.notificacion.subscribe((respuesta: any) => {
      this.medico.img = respuesta.medico.img;
    });
  }


  public cargarMedico(id: string) {
    this.medicoService.cargarMedico(id).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambiohospital(this.medico.hospital);
    });
  }


  public guardarMedico(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }

    this.medicoService.guardarMedico(this.medico).subscribe( medico => {
      this.medico._id = medico._id;

      this.router.navigate(['/medico', medico._id]);
    });
  }


  public cambiohospital(id: string) {
    this.hospitalesService.obtenerHospital(id).subscribe((respuesta: any) => this.hospital = respuesta.hospital);
  }


  public cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
