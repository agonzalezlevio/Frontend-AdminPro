import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public forma: FormGroup;
  public emailLocal: string;

  constructor(public router: Router, public usuarioService: UsuarioService) {
      // Forma formulario usuario login
      this.forma = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recordarme: new FormControl(false)
      });
  }

  ngOnInit() {
    init_plugins();

    this.emailLocal = localStorage.getItem('email') || '';

    if (this.emailLocal.length > 1 ) {
        this.forma.patchValue({
          correo: this.emailLocal,
          recordarme : true
        });
    }
  }


  public ingresar() {
    // Si el formulario es invalido
    if (this.forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, this.forma.value.correo, this.forma.value.password);

    this.usuarioService.login(usuario, this.forma.value.recordarme)
      .subscribe(respuesta => { 
        console.log(respuesta);
        this.router.navigate(['/dashboard']);
      });

    // this.router.navigate(['/dashboard']);
  }

}
