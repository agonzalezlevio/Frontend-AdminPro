import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent , data: {titulo: 'Progress'} },
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}  },
          { path: 'account-setting', component: AccountSettingsComponent , data: {titulo: 'Ajustes de usuario'} },
          { path: 'perfil', component: ProfileComponent , data: {titulo: 'Perfil de usuario'} },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas Vanila JS'}  },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'}  },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
          // Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}  },

        ]
      }
];


export const  PAGE_ROUTES = RouterModule.forChild(pageRoutes);
