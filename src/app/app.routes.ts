import { Routes } from '@angular/router';
import { ClienteListComponent } from './features/clientes/cliente-list.component';
import { ClienteFormComponent } from './features/clientes/form/cliente-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

];
