import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public settingsService: SettingsService) { }



  ngOnInit() {
    this.colocarCheck();
  }

  public cambiarColor(color: string, link: any) {

    this.aplicarCheck(link);

    this.settingsService.aplicarTema(color);

  }

  public aplicarCheck(link: any) {
    const selectores: any = this.document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }


  public colocarCheck() {
    const selectores: any = this.document.getElementsByClassName('selector');

    const tema = this.settingsService.ajustes.tema;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
