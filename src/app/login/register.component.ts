import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


declare function init_plugins();



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public forma: FormGroup;


  constructor(public usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    init_plugins();

    // Forma formulario usuario
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
      },
      { validators: this.esIgual('password', 'password2') }
      );

    /* this.forma.setValue({
        nombre: 'Test',
        correo: 'test@email.cl',
        password: '123456',
        password2: '123456',
        condiciones: true
      }); */

  }


  public esIgual(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
          return null;
      }

      return {
        esIgual: true
      };
    };
  }


  public registrarUsuario() {
    // Si el formulario es invalido
    if (this.forma.invalid) {
      return;
    }
    // Si no selecciona las condiciones
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe de aceptar las condiciones',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(respuestaUsuario => this.router.navigate(['/login']));
  }

}
