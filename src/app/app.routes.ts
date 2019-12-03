import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/guards/login.guard';
import { VerificatokenGuard } from './services/guards/verificatoken.guard';

// Rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    canActivateChild: [VerificatokenGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
},
  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
