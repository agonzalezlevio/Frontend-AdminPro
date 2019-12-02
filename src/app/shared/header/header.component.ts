import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  public buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

}
