import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes: Ajustes = {
    temaURL: 'assets/css/colors/default.css',
    tema: 'default'
  };


  constructor(@Inject(DOCUMENT) public document: Document) {
    this.getAjustes();
   }

  public setAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  public getAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      // Si no existe un tema se aplica por defecto
      this.aplicarTema(this.ajustes.tema);
    }
  }


  public aplicarTema(tema: string) {
    const URL = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', URL);

    // Guardando ajustes de tema en localstorage
    this.ajustes.tema = tema;
    this.ajustes.temaURL = URL;
    this.setAjustes();
  }

}

interface Ajustes {
  temaURL: string;
  tema: string;
}
