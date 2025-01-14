import { Routes } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list.component';
import { ClienteFormComponent } from './features/clientes/form/cliente-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './features/auth/auth.guard';
import { SignupComponent } from './features/auth/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  {
    path: 'clientes',
    component: ClienteListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/novo',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/editar/:id',
    component: ClienteFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
