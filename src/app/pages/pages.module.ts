import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


// Rutas hijas


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component,
        IncrementadorComponent, // temporal
        GraficoDonaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGE_ROUTES,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule { }
