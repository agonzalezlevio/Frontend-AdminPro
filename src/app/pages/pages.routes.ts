import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

const pageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graficas1', component: Graficas1Component },
          { path: 'account-setting', component: AccountSettingsComponent },
          { path: 'promesas', component: PromesasComponent },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
        ]
      }
];


export const  PAGE_ROUTES = RouterModule.forChild(pageRoutes);
