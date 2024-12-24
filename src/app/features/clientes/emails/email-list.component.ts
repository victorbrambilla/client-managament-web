import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Email } from '../../../core/models/email.model';
import { Categoria } from '../../../core/models/categoria.model';
import { EmailService } from './email.service';
import { EmailFormDialogComponent } from './components/dialog/email-form-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { CategoriaService } from '../categorias/categoria.service';
import { CategoriaFormDialogComponent } from '../categorias/categoria-form-dialog.component';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
  standalone: false,
})
export class EmailListComponent implements OnInit {
  @Input() clienteId!: number;

  emails: Email[] = [];
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['email', 'categoria', 'acoes'];
  isLoading = false;

  constructor(
    private emailService: EmailService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmails();
    this.loadCategorias();
  }

  async loadEmails(): Promise<void> {
    try {
      this.isLoading = true;
      this.emails =
        (await this.emailService
          .getEmailsByCliente(this.clienteId)
          .toPromise()) ?? [];
    } catch (error) {
      this.showErrorMessage('Erro ao carregar e-mails');
      console.error('Erro ao carregar e-mails:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadCategorias(): Promise<void> {
    try {
      this.categorias =
        (await this.categoriaService.getCategorias().toPromise()) ?? [];
    } catch (error) {
      this.showErrorMessage('Erro ao carregar categorias');
      console.error('Erro ao carregar categorias:', error);
    }
  }

  openEmailDialog(email?: Email): void {
    const dialogRef = this.dialog.open(EmailFormDialogComponent, {
      width: '500px',
      data: {
        email: email ? { ...email } : { clienteId: this.clienteId },
        categorias: this.categorias,
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          if (result.id) {
            await this.emailService
              .updateEmail(result.id, {
                categoriaId: result.categoria.id!,
                email: result.email,
                clienteId: result.clienteId,
              })
              .toPromise();
            this.showSuccessMessage('E-mail atualizado com sucesso');
          } else {
            console.log(result);
            await this.emailService
              .createEmail({
                categoriaId: result.categoria.id!,
                clienteId: result.clienteId,
                email: result.email,
              })
              .toPromise();
            this.showSuccessMessage('E-mail adicionado com sucesso');
          }
          this.loadEmails();
        } catch (error) {
          this.showErrorMessage('Erro ao salvar e-mail');
          console.error('Erro ao salvar e-mail:', error);
        }
      }
    });
  }

  async deleteEmail(email: Email): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar exclusão',
        message: 'Tem certeza que deseja excluir este e-mail?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          await this.emailService.deleteEmail(email.id!).toPromise();
          this.showSuccessMessage('E-mail excluído com sucesso');
          this.loadEmails();
        } catch (error) {
          this.showErrorMessage('Erro ao excluir e-mail');
          console.error('Erro ao excluir e-mail:', error);
        }
      }
    });
  }

  openCategoriaDialog(): void {
    const dialogRef = this.dialog.open(CategoriaFormDialogComponent, {
      width: '500px',
    });

    dialogRef.componentInstance.categoriaUpdated.subscribe(() => {
      this.loadCategorias();
      this.loadEmails();
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategorias();
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
