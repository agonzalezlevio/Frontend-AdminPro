import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { NgModule } from '@angular/core';

const pageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graficas1', component: Graficas1Component },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
        ]
      }
];


export const  PAGE_ROUTES = RouterModule.forChild(pageRoutes);
