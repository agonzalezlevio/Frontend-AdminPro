import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Se inyecta el servicio de temas al inicio de la aplicación
  constructor(public settingsService: SettingsService) {
  }

}
