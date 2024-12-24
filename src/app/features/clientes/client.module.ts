import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes
import { ClienteListComponent } from './cliente-list.component';
 

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ClienteFormComponent } from './form/cliente-form.component';
import { EmailListComponent } from './emails/email-list.component';
import { EmailFormDialogComponent } from './emails/components/dialog/email-form-dialog.component';
import { CategoriaFormDialogComponent } from './categorias/categoria-form-dialog.component';
import { ClienteService } from './clientes.service';
import { EmailService } from './emails/email.service';
import { CategoriaService } from './categorias/categoria.service';

// Serviços
 

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,
    EmailListComponent,
    EmailFormDialogComponent,
    CategoriaFormDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [
    ClienteService,
    EmailService,
    CategoriaService
  ]
})
export class ClienteModule { }