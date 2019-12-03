import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guards
import { LoginGuard } from '../services/guards/login.guard';
import { AdminGuard } from '../services/guards/admin.guard';

const pageRoutes: Routes = [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
      { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajustes de usuario' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas Vanila JS' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS' } },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: {
          titulo: 'Mantenimiento de usuarios'
        }
      },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico' } },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
];


export const PAGE_ROUTES = RouterModule.forChild(pageRoutes);
