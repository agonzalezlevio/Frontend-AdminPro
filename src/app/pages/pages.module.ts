import { NgModule } from '@angular/core';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages.routes';


// Rutas hijas


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGE_ROUTES
    ]
})
export class PagesModule { }
