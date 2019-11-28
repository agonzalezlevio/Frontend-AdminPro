import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public forma: FormGroup;
  public emailLocal: string;
  public auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService, private zone: NgZone) {
    // Forma formulario usuario login
    this.forma = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recordarme: new FormControl(false)
    });
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.emailLocal = localStorage.getItem('email') || '';

    if (this.emailLocal.length > 1) {
      this.forma.patchValue({
        correo: this.emailLocal,
        recordarme: true
      });
    }



  }
  // Inicializa Signin v2 y configura a los listeners
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1000311483562-c2fgptnao303fo28va1gbkhn66g7imsv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  // Cuando el usuario hace clic en el botón de inicio de sesión de Google, este abre el cuadro de diálogo de inicio de sesión
  public attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();

      // Obtener el token
      const token = googleUser.getAuthResponse().id_token;
      // login a través de Google
      this.zone.run(() => {
        this.usuarioService.loginGoogle(token)
          .subscribe(isLogeado => this.router.navigate(['/dashboard']));
      });
    });
  }

  public ingresar() {
    // Si el formulario es invalido
    if (this.forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, this.forma.value.correo, this.forma.value.password);

    this.usuarioService.login(usuario, this.forma.value.recordarme)
      .subscribe(respuesta => {
        // console.log(respuesta);
        this.router.navigate(['/dashboard']);
      });

    // this.router.navigate(['/dashboard']);
  }

}
