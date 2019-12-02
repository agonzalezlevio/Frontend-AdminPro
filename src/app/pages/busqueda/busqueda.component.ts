import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
    ) {
    activatedRoute.params.subscribe( params => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }


  public buscar(termino: string) {
    const URL = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(URL).subscribe((respuesta: any) => {

      this.hospitales = respuesta.hospitales;
      this.usuarios = respuesta.usuarios;
      this.medicos = respuesta.medicos;
      this.cargando = false;
    });
  }

}
