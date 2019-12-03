import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { PagesModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule, //Forma estática
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, // Temporal para component
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
