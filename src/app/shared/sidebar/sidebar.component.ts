import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {


  public usuario: Usuario;

  constructor(
    public sidebarService: SidebarService,
    public usuarioService: UsuarioService)
    {}

  ngOnInit() {
    // Se inserta el usuario en el sidebar
    this.usuario = this.usuarioService.usuario;
    // Recargar del menú cada vez que se inicializa el sidebar
    this.sidebarService.cargarMenu();
  }

}
